import { loadMapsLibrary } from '../services/mapsLoader'
import { useEffect, useRef } from 'react'

type LocationInputProps = {
  id: string
  name: string
  value: string
  placeholder?: string
  mapsEnabled: boolean
  onChange: (value: string) => void
}

export function LocationInput({
  id,
  name,
  value,
  placeholder,
  mapsEnabled,
  onChange,
}: LocationInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!mapsEnabled || !inputRef.current) {
      return
    }

    let listener: google.maps.MapsEventListener | null = null
    let disposed = false

    loadMapsLibrary('places').then((places) => {
      if (disposed || !inputRef.current) {
        return
      }

      const autocomplete = new places.Autocomplete(
        inputRef.current,
        {
          types: ['geocode'],
        },
      )

      listener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        const nextValue = place.formatted_address || place.name
        if (nextValue) {
          onChange(nextValue)
        }
      })
    })

    return () => {
      disposed = true
      if (listener) {
        listener.remove()
      }
    }
  }, [mapsEnabled, onChange])

  return (
    <input
      ref={inputRef}
      id={id}
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
