import { importLibrary, setOptions } from '@googlemaps/js-api-loader'

let configured = false

export function loadMapsLibrary<T extends Parameters<typeof importLibrary>[0]>(
  library: T,
) {
  if (!configured) {
    setOptions({
      key: import.meta.env.VITE_MAPS_API_KEY || '',
      region: 'IN',
    })
    configured = true
  }

  return importLibrary(library)
}
