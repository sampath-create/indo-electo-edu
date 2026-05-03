import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LocationInput } from './LocationInput'

vi.mock('../services/mapsLoader', () => ({
  loadMapsLibrary: vi.fn().mockResolvedValue({
    PlaceAutocompleteElement: vi.fn().mockImplementation(() => {
      const el = document.createElement('div');
      el.setAttribute = vi.fn();
      el.addEventListener = vi.fn();
      return el;
    })
  })
}))

describe('LocationInput', () => {
  it('renders input with props', () => {
    const handleChange = vi.fn()
    render(<LocationInput id="loc" name="loc" value="Pune" mapsEnabled={false} onChange={handleChange} />)
    const input = screen.getByDisplayValue('Pune')
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'Delhi' } })
    expect(handleChange).toHaveBeenCalledWith('Delhi')
  })
})
