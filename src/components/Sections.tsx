import type { RegionConfig } from '../types'

export function EligibilitySection({ region }: { region: RegionConfig }) {
  return (
    <section className="panel" aria-labelledby="eligibility-title">
      <div className="panel__header">
        <h2 id="eligibility-title">Eligibility check</h2>
        <p>These are the basic eligibility rules for India.</p>
      </div>
      <div className="card-grid">
        <div className="card">
          <h3>Core requirements</h3>
          <ul className="steps">
            {region.eligibility.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>If you are not eligible yet</h3>
          <ul className="steps">
            <li>You can register once you meet the minimum age.</li>
            <li>Keep proof of age and address ready.</li>
            <li>Check deadlines as your area announces elections.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function RegistrationSection({ region }: { region: RegionConfig }) {
  return (
    <section className="panel" aria-labelledby="registration-title">
      <div className="panel__header">
        <h2 id="registration-title">Registration guidance</h2>
        <p>Pick the path that matches your situation.</p>
      </div>
      <div className="card-grid">
        <div className="card">
          <h3>New voter</h3>
          <ul className="steps">
            {region.registration.newVoter.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Change of address</h3>
          <ul className="steps">
            {region.registration.changeAddress.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Name missing from the list</h3>
          <ul className="steps">
            {region.registration.nameMissing.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Documents to keep ready</h3>
          <ul className="steps">
            {region.registration.documents.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function TimelineSection({ region }: { region: RegionConfig }) {
  return (
    <section className="panel" aria-labelledby="timeline-title">
      <div className="panel__header">
        <h2 id="timeline-title">Election timeline</h2>
        <p>A simple view of the main phases.</p>
      </div>
      <div className="timeline">
        {region.timeline.map((phase) => (
          <div key={phase.phase} className="timeline__item">
            <h3>{phase.phase}</h3>
            <ul className="steps">
              {phase.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function VotingDaySection({ region }: { region: RegionConfig }) {
  return (
    <section className="panel" aria-labelledby="voting-title">
      <div className="panel__header">
        <h2 id="voting-title">Voting day guide</h2>
        <p>What to bring and what to expect.</p>
      </div>
      <div className="card-grid two-col">
        <div className="card">
          <h3>Bring with you</h3>
          <ul className="steps">
            {region.votingDay.bring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Steps at the polling station</h3>
          <ul className="steps">
            {region.votingDay.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function FAQSection({ region }: { region: RegionConfig }) {
  return (
    <section className="panel" aria-labelledby="faq-title">
      <div className="panel__header">
        <h2 id="faq-title">Frequently asked questions</h2>
        <p>Quick answers to common situations.</p>
      </div>
      <div className="faq">
        {region.faq.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function NotesSection({ region }: { region: RegionConfig }) {
  return (
    <section className="panel" aria-labelledby="notes-title">
      <div className="panel__header">
        <h2 id="notes-title">Important notes</h2>
        <p>Keep these in mind before you act.</p>
      </div>
      <div className="card">
        <ul className="steps">
          {region.disclaimers.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
