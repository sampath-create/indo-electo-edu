import { describe, it, expect, vi } from 'vitest'
import { loadMapsLibrary } from './mapsLoader'

vi.mock('@googlemaps/js-api-loader', () => ({
  setOptions: vi.fn(),
  importLibrary: vi.fn().mockResolvedValue('loaded'),
}))

describe('mapsLoader', () => {
  it('calls setOptions and importLibrary', async () => {
    const lib = await loadMapsLibrary('places')
    expect(lib).toBe('loaded')
  })
})
