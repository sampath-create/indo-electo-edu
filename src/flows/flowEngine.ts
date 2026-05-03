import type { Guidance, RegionConfig, UserState } from '../types'

export function getGuidance(state: UserState, region: RegionConfig): Guidance {
  const questions: string[] = []

  if (state.age === undefined) {
    questions.push('How old are you?')
  }

  if (state.citizen === 'unknown') {
    questions.push('Are you an Indian citizen?')
  }

  const eligibleAge =
    state.age !== undefined && state.age >= region.eligibility.minAge

  if (state.citizen === 'yes' && eligibleAge && state.registered === 'unknown') {
    questions.push('Are you already registered to vote?')
  }

  if (state.citizen === 'no') {
    return {
      title: 'Citizenship required',
      steps: [
        'Voting in India is for Indian citizens only.',
        'If your status changes, you can register once you meet the age requirement.',
        'Keep proof of age and address ready for future registration.',
      ],
      note: 'If you are unsure, confirm your citizenship status with official guidance.',
    }
  }

  if (state.age !== undefined && state.age < region.eligibility.minAge) {
    return {
      title: 'Not eligible yet',
      steps: [
        `You can register when you are ${region.eligibility.minAge} or older.`,
        'Keep proof of age and address ready.',
        'Check local deadlines as election schedules are announced.',
      ],
      note: 'Eligibility dates and deadlines can vary by state.',
    }
  }

  if (questions.length > 0) {
    return {
      title: 'Start with eligibility',
      steps: [
        'Confirm your age and citizenship first.',
        'If eligible, check whether you are already registered.',
        'Use the registration guidance below if you need to apply or update.',
      ],
      questions,
      note: 'This assistant focuses on process only and does not suggest who to vote for.',
    }
  }

  if (state.registered === 'no') {
    return {
      title: 'Register to vote',
      steps: [
        'Apply for new voter registration through ECI voter services or your local office.',
        'Provide proof of age and address as accepted in your state.',
        'Track the application and confirm your name in the electoral roll.',
      ],
      note: 'Apply early to avoid missing deadlines.',
    }
  }

  if (state.registered === 'unknown') {
    return {
      title: 'Confirm your registration',
      steps: [
        'Search the electoral roll for your name and details.',
        'If your name is missing, submit a claim or a new registration.',
        'If details are incorrect, submit a correction request.',
      ],
      note: 'Deadlines for roll updates are announced ahead of elections.',
    }
  }

  const steps = [
    'Confirm your name in the electoral roll for your constituency.',
    'Check polling station details close to election day.',
    'Bring a valid photo ID on voting day.',
    'If you moved, update your address well in advance.',
  ]

  if (state.location) {
    steps.splice(
      2,
      0,
      'Use your location to find the nearest polling station when maps are enabled.',
    )
  }

  return {
    title: 'You are on track',
    steps,
    note: 'Rules and accepted IDs can vary by state. Confirm locally if unsure.',
  }
}
