import { useMemo, useState, Suspense, lazy } from 'react'
import './App.css'
import { LocationInput } from './components/LocationInput'
import {
  EligibilitySection,
  RegistrationSection,
  TimelineSection,
  VotingDaySection,
  FAQSection,
  NotesSection,
} from './components/Sections'

const MapPanel = lazy(() =>
  import('./components/MapPanel').then((module) => ({
    default: module.MapPanel,
  }))
)
import { eciIndia } from './data/regions'
import { getGuidance } from './flows/flowEngine'
import { firebaseStatus } from './lib/firebase'
import type { CitizenshipStatus, RegistrationStatus, UserState } from './types'

const region = eciIndia

function App() {
  const [ageInput, setAgeInput] = useState('')
  const [citizen, setCitizen] = useState<CitizenshipStatus>('unknown')
  const [registered, setRegistered] = useState<RegistrationStatus>('unknown')
  const [location, setLocation] = useState('')

  const parsedAge = ageInput.trim() === '' ? undefined : Number(ageInput)
  const ageIsValid =
    parsedAge !== undefined &&
    Number.isFinite(parsedAge) &&
    parsedAge >= 0 &&
    parsedAge <= 120
  const age = ageIsValid ? parsedAge : undefined

  const state: UserState = {
    age,
    citizen,
    registered,
    location: location.trim() || undefined,
  }

  const guidance = useMemo(
    () => getGuidance(state, region),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.age, state.citizen, state.registered, state.location, region],
  )

  const mapsEnabled = Boolean(import.meta.env.VITE_MAPS_API_KEY)

  const resetForm = () => {
    setAgeInput('')
    setCitizen('unknown')
    setRegistered('unknown')
    setLocation('')
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__content">
          <p className="eyebrow">Neutral civic voting helper</p>
          <h1>Election Guide for India</h1>
          <p className="lead">
            Clear, step-by-step guidance on eligibility, registration, timelines,
            and voting day. This assistant is process-only and non-political.
          </p>
          <div className="badge-row">
            <span className="badge">Eligibility</span>
            <span className="badge">Registration</span>
            <span className="badge">Voting Day</span>
            <span className="badge">FAQ</span>
          </div>
          <div className="hero__meta">
            <div className="pill">Region: {region.label}</div>
            <div className="pill">Authority: {region.authority}</div>
          </div>
        </div>
        <div className="hero__panel">
          <div className="status-row">
            <span className={`status ${firebaseStatus.enabled ? 'ok' : 'warn'}`}>
              Firebase: {firebaseStatus.enabled ? 'ready' : 'not configured'}
            </span>
            <span className={`status ${mapsEnabled ? 'ok' : 'warn'}`}>
              Maps: {mapsEnabled ? 'ready' : 'not configured'}
            </span>
          </div>
          <div className="guidance">
            <h2>Personal guidance</h2>
            <p className="muted">
              Answer a few questions to get the right next steps. Your inputs
              stay in this browser.
            </p>
            <div className="guidance__box" aria-live="polite">
              <h3>{guidance.title}</h3>
              <ul className="steps">
                {guidance.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              {guidance.questions && guidance.questions.length > 0 && (
                <div className="questions">
                  <p className="questions__title">Next questions</p>
                  <ul>
                    {guidance.questions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                </div>
              )}
              {guidance.note && <p className="note">{guidance.note}</p>}
            </div>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="panel">
          <div className="panel__header">
            <h2>Start here</h2>
            <p>
              Share only what you are comfortable with. This flow helps you
              decide your next action.
            </p>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="age">Your age</label>
              <input
                id="age"
                name="age"
                type="number"
                inputMode="numeric"
                min={0}
                max={120}
                placeholder="Enter your age"
                value={ageInput}
                onChange={(event) => setAgeInput(event.target.value)}
                aria-invalid={!ageIsValid && ageInput.trim() !== ''}
                aria-describedby={!ageIsValid && ageInput.trim() !== '' ? 'age-error' : 'age-hint'}
              />
              <p id="age-hint" className="hint">Used only to check eligibility.</p>
              {ageInput.trim() !== '' && !ageIsValid && (
                <p id="age-error" className="error">Enter a valid age between 0 and 120.</p>
              )}
            </div>
            <div className="field">
              <label htmlFor="citizen">Indian citizen?</label>
              <select
                id="citizen"
                name="citizen"
                value={citizen}
                onChange={(event) =>
                  setCitizen(event.target.value as CitizenshipStatus)
                }
              >
                <option value="unknown">Not sure yet</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="registered">Already registered to vote?</label>
              <select
                id="registered"
                name="registered"
                value={registered}
                onChange={(event) =>
                  setRegistered(event.target.value as RegistrationStatus)
                }
              >
                <option value="unknown">Not sure yet</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="location">Your location (optional)</label>
              <LocationInput
                id="location"
                name="location"
                placeholder="City or district"
                value={location}
                mapsEnabled={mapsEnabled}
                onChange={setLocation}
              />
              <p className="hint">Helps find polling stations when enabled.</p>
              {!mapsEnabled && (
                <p className="hint">Add a Maps API key to enable suggestions.</p>
              )}
            </div>
          </div>
          <div className="answer-row">
            <span className="pill">Age: {age ?? 'not shared'}</span>
            <span className="pill">
              Citizen: {citizen === 'unknown' ? 'not sure' : citizen}
            </span>
            <span className="pill">
              Registered: {registered === 'unknown' ? 'not sure' : registered}
            </span>
            {state.location && <span className="pill">Location: saved</span>}
            <button className="ghost" type="button" onClick={resetForm} aria-label="Reset form fields">
              Reset
            </button>
          </div>
        </section>

        <EligibilitySection region={region} />
        <RegistrationSection region={region} />
        <TimelineSection region={region} />
        <VotingDaySection region={region} />

        <section className="panel" aria-labelledby="location-aware-title">
          <div className="panel__header">
            <h2 id="location-aware-title">Location-aware support</h2>
            <p>
              When enabled, the assistant can show polling stations and nearby
              election offices.
            </p>
          </div>
          <div className="card-grid two-col">
            <div className="card">
              <h3>Polling stations</h3>
              <ul className="steps">
                <li>Use your city or district to narrow down results.</li>
                <li>Confirm the station details close to election day.</li>
                <li>Maps integration is optional and can be enabled later.</li>
              </ul>
            </div>
            <div className="card">
              <h3>System status</h3>
              <ul className="steps">
                <li>Maps: {mapsEnabled ? 'configured' : 'not configured'}</li>
                <li>
                  Firebase: {firebaseStatus.enabled ? 'configured' : 'not configured'}
                </li>
                <li>Location data is not stored unless you choose to save it.</li>
              </ul>
            </div>
            <div className="card map-card">
              <h3>Map preview</h3>
              <Suspense fallback={<div>Loading map...</div>}>
                <MapPanel location={state.location} mapsEnabled={mapsEnabled} />
              </Suspense>
            </div>
          </div>
        </section>

        <FAQSection region={region} />
        <NotesSection region={region} />

        <section className="panel next-step">
          <div className="panel__header">
            <h2>Suggested next step</h2>
            <p>
              {guidance.questions && guidance.questions.length > 0
                ? guidance.questions[0]
                : guidance.steps[0]}
            </p>
          </div>
          <p className="muted">
            If something is unclear, check the official ECI guidance for your
            state.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
