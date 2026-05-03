export type IntentName =
  | 'eligibility'
  | 'registration'
  | 'timeline'
  | 'voting_day'
  | 'faq'
  | 'unknown'

export type IntentResult = {
  intent: IntentName
  confidence: number
}

// Placeholder for Dialogflow or Vertex AI integration.
export function detectIntent(text: string): IntentResult {
  const trimmed = text.trim()
  if (!trimmed) {
    return { intent: 'unknown', confidence: 0 }
  }

  return { intent: 'unknown', confidence: 0 }
}
