export type CitizenshipStatus = 'yes' | 'no' | 'unknown'
export type RegistrationStatus = 'yes' | 'no' | 'unknown'

export type UserState = {
  age?: number
  citizen: CitizenshipStatus
  registered: RegistrationStatus
  location?: string
}

export type Guidance = {
  title: string
  steps: string[]
  questions?: string[]
  note?: string
}

export type RegionTimelinePhase = {
  phase: string
  steps: string[]
}

export type RegionConfig = {
  id: string
  label: string
  authority: string
  eligibility: {
    minAge: number
    notes: string[]
  }
  registration: {
    newVoter: string[]
    changeAddress: string[]
    nameMissing: string[]
    documents: string[]
  }
  timeline: RegionTimelinePhase[]
  votingDay: {
    bring: string[]
    steps: string[]
  }
  faq: {
    q: string
    a: string
  }[]
  disclaimers: string[]
}
