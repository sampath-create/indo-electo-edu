import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MapPanel } from './MapPanel'

vi.mock('../services/mapsLoader', () => ({
  loadMapsLibrary: vi.fn().mockImplementation((lib) => {
    if (lib === 'maps') {
      return Promise.resolve({ Map: vi.fn() })
    }
    if (lib === 'geocoding') {
      return Promise.resolve({
        Geocoder: vi.fn().mockImplementation(() => ({
          geocode: vi.fn((_, cb) => cb([{ geometry: { location: {} } }], 'OK'))
        }))
      })
    }
    if (lib === 'marker') {
      return Promise.resolve({ Marker: vi.fn() })
    }
    return Promise.resolve({})
  })
}))

describe('MapPanel', () => {
  it('renders disabled state', () => {
    render(<MapPanel mapsEnabled={false} />)
    expect(screen.getByText(/Maps are disabled/i)).toBeInTheDocument()
  })

  it('renders loading and ready state', async () => {
    render(<MapPanel mapsEnabled={true} />)
    expect(screen.getByText(/Loading map/i)).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText(/Enter a location to center the map/i)).toBeInTheDocument()
    })
  })

  it('loads geocode when location provided', async () => {
    render(<MapPanel mapsEnabled={true} location="Delhi" />)
    await waitFor(() => {
      expect(screen.getByText(/Showing the location you entered/i)).toBeInTheDocument()
    })
  })
})
