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
  const containerRef = useRef<HTMLDivElement | null>(null)
  const elementRef = useRef<any>(null)

  useEffect(() => {
    if (!mapsEnabled) {
      return
    }

    let disposed = false

    loadMapsLibrary('places').then((places: any) => {
      if (disposed || !containerRef.current) {
        return
      }

      // Hide the fallback input when maps are successfully loaded
      if (inputRef.current) {
        inputRef.current.style.display = 'none'
      }

      if ('PlaceAutocompleteElement' in places) {
        const autocomplete = new places.PlaceAutocompleteElement()
        autocomplete.id = id
        if (placeholder) {
          // Setting property or attribute based on component support
          autocomplete.setAttribute('placeholder', placeholder)
        }
        
        containerRef.current.appendChild(autocomplete)
        elementRef.current = autocomplete

        autocomplete.addEventListener('gmp-placeselect', async (event: any) => {
          const place = event.place
          if (!place) return
          await place.fetchFields({ fields: ['displayName', 'formattedAddress'] })
          const nextValue = place.formattedAddress || place.displayName
          if (nextValue) {
            onChange(nextValue)
          }
        })
      }
    })

    return () => {
      disposed = true
      if (containerRef.current && elementRef.current) {
        containerRef.current.removeChild(elementRef.current)
        elementRef.current = null
      }
      if (inputRef.current) {
        inputRef.current.style.display = 'block'
      }
    }
  }, [mapsEnabled, onChange, id, placeholder])

  return (
    <div className="location-input-wrapper">
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div ref={containerRef} className="autocomplete-container"></div>
    </div>
  )
}
