import { loadMapsLibrary } from '../services/mapsLoader'
import { useEffect, useRef, useState } from 'react'

type MapPanelProps = {
  location?: string
  mapsEnabled: boolean
}

const defaultCenter = { lat: 20.5937, lng: 78.9629 }

export function MapPanel({ location, mapsEnabled }: MapPanelProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    'idle',
  )

  useEffect(() => {
    if (!mapsEnabled || !mapRef.current || mapInstance.current) {
      return
    }

    setStatus('loading')

    loadMapsLibrary('maps')
      .then((maps) => {
        if (!mapRef.current) {
          return
        }
        mapInstance.current = new maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 4,
          disableDefaultUI: true,
          zoomControl: true,
        })
        setStatus('ready')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [mapsEnabled])

  useEffect(() => {
    if (!mapsEnabled || !mapInstance.current) {
      return
    }

    if (!location) {
      mapInstance.current.setCenter(defaultCenter)
      mapInstance.current.setZoom(4)
      if (markerRef.current) {
        markerRef.current.setMap(null)
        markerRef.current = null
      }
      return
    }

    let cancelled = false

    const loadGeocode = async () => {
      const geocoding = await loadMapsLibrary('geocoding')
      const marker = await loadMapsLibrary('marker')
      const geocoder = new geocoding.Geocoder()

      geocoder.geocode({ address: location }, (results, status) => {
        if (cancelled || !mapInstance.current) {
          return
        }

        if (status === 'OK' && results && results[0]) {
          const position = results[0].geometry.location
          mapInstance.current.setCenter(position)
          mapInstance.current.setZoom(11)
          if (markerRef.current) {
            markerRef.current.setMap(null)
          }
          markerRef.current = new marker.Marker({
            map: mapInstance.current,
            position,
          })
        }
      })
    }

    loadGeocode().catch(() => {
      setStatus('error')
    })

    return () => {
      cancelled = true
    }
  }, [location, mapsEnabled])

  if (!mapsEnabled) {
    return (
      <div className="map-placeholder">
        <p>Maps are disabled. Add a Maps API key to enable the preview.</p>
      </div>
    )
  }

  return (
    <div className="map-frame">
      <div className="map-canvas" ref={mapRef} />
      <p className="map-note">
        {status === 'loading' && 'Loading map…'}
        {status === 'ready' &&
          (location
            ? 'Showing the location you entered.'
            : 'Enter a location to center the map.')}
        {status === 'error' &&
          'Map failed to load. Check your API key and billing settings.'}
      </p>
    </div>
  )
}
