import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main title', () => {
    render(<App />)
    expect(screen.getByText('Election Guide for India')).toBeInTheDocument()
  })

  it('shows validation error for invalid age', () => {
    render(<App />)
    const ageInput = screen.getByLabelText(/Your age/i)
    fireEvent.change(ageInput, { target: { value: '150' } })
    expect(screen.getByText('Enter a valid age between 0 and 120.')).toBeInTheDocument()
  })

  it('updates guidance based on inputs', () => {
    render(<App />)
    const ageInput = screen.getByLabelText(/Your age/i)
    fireEvent.change(ageInput, { target: { value: '17' } })
    const citizenSelect = screen.getByLabelText(/Indian citizen\?/i)
    fireEvent.change(citizenSelect, { target: { value: 'yes' } })
    
    
    expect(screen.getByText('Not eligible yet')).toBeInTheDocument()
  })

  it('resets the form', () => {
    render(<App />)
    const ageInput = screen.getByLabelText(/Your age/i)
    fireEvent.change(ageInput, { target: { value: '25' } })
    expect(ageInput).toHaveValue(25)
    
    const resetButton = screen.getByRole('button', { name: /Reset form fields/i })
    fireEvent.click(resetButton)
    expect(ageInput).toHaveValue(null)
  })
})
