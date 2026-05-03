export type PollingStationQuery = {
  query: string
  locationText?: string
}

export function buildPollingStationQuery(
  locationText?: string,
): PollingStationQuery {
  const trimmed = locationText?.trim()
  const query = trimmed ? `polling station near ${trimmed}` : 'polling station near me'
  return { query, locationText: trimmed || undefined }
}
