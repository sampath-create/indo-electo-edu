import type { RegionConfig } from '../../types'

export const eciIndia: RegionConfig = {
  id: 'eci-india',
  label: 'India (ECI)',
  authority: 'Election Commission of India',
  eligibility: {
    minAge: 18,
    notes: [
      'You must be 18 or older by the qualifying date for your area.',
      'You must be an Indian citizen.',
      'You should be ordinarily resident in the constituency where you register.',
    ],
  },
  registration: {
    newVoter: [
      'Apply for new voter registration through ECI voter services or your local office.',
      'Provide proof of age and address as accepted in your state.',
      'Track the application and confirm your name in the electoral roll.',
    ],
    changeAddress: [
      'Submit an address update and select the new constituency.',
      'Provide updated address proof if requested.',
      'Confirm the updated entry in the electoral roll.',
    ],
    nameMissing: [
      'Search the electoral roll for your area.',
      'If missing, submit a claim or a new registration before the deadline.',
      'If details are wrong, submit a correction request.',
    ],
    documents: [
      'Proof of age',
      'Proof of address',
      'Photo ID if requested',
      'Accepted documents can vary by state',
    ],
  },
  timeline: [
    {
      phase: 'Pre-election',
      steps: [
        'Voter registration and roll updates',
        'Candidate nominations and scrutiny',
        'Final list of candidates announced',
      ],
    },
    {
      phase: 'Campaign period',
      steps: [
        'Campaigning as per rules',
        'Voter outreach and public meetings',
        'Silence period before polling',
      ],
    },
    {
      phase: 'Voting day',
      steps: [
        'Polling stations open for voting',
        'Identity verification at the booth',
        'Vote in privacy',
      ],
    },
    {
      phase: 'Counting and results',
      steps: [
        'Votes are counted',
        'Results are announced',
        'Post-election procedures follow',
      ],
    },
  ],
  votingDay: {
    bring: [
      'A valid photo ID accepted for voting',
      'Voter slip if you have it',
      'Know your polling station details',
    ],
    steps: [
      'Find your polling station and queue in the correct line.',
      'Show your ID and complete verification.',
      'Cast your vote in privacy.',
      'Follow on-site instructions before leaving.',
    ],
  },
  faq: [
    {
      q: 'Can I vote without a voter ID?',
      a: 'Your name must be in the electoral roll. A voter ID helps, but other accepted IDs may be allowed at the polling station. Check the current accepted list for your area.',
    },
    {
      q: 'What if my name is not in the list?',
      a: 'Apply to register or file a claim for inclusion before the deadline. If the deadline has passed, you may need to wait for the next update.',
    },
    {
      q: 'Can I vote from another city?',
      a: 'You can vote only in your registered constituency. If you moved, update your address in advance. Some categories may have absentee options.',
    },
    {
      q: 'What if my details are incorrect?',
      a: 'Submit a correction request with the updated information and supporting documents, then confirm the change in the electoral roll.',
    },
  ],
  disclaimers: [
    'Rules, deadlines, and accepted documents can vary by state and election type.',
    'If you are unsure, confirm details with official ECI guidance for your area.',
    'Do not share sensitive personal data unless required for an official process.',
  ],
}
