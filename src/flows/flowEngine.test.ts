import { describe, it, expect } from 'vitest'
import { getGuidance } from './flowEngine'
import { eciIndia } from '../data/regions'

describe('getGuidance', () => {
  it('asks for age if missing', () => {
    const result = getGuidance({ age: undefined, citizen: 'unknown', registered: 'unknown' }, eciIndia)
    expect(result.questions).toContain('How old are you?')
  })

  it('rejects non-citizens', () => {
    const result = getGuidance({ age: 25, citizen: 'no', registered: 'unknown' }, eciIndia)
    expect(result.title).toBe('Citizenship required')
  })

  it('rejects underage users', () => {
    const result = getGuidance({ age: 17, citizen: 'yes', registered: 'unknown' }, eciIndia)
    expect(result.title).toBe('Not eligible yet')
  })

  it('asks for registration if eligible and citizen', () => {
    const result = getGuidance({ age: 25, citizen: 'yes', registered: 'unknown' }, eciIndia)
    expect(result.questions).toContain('Are you already registered to vote?')
  })

  it('guides to register if not registered', () => {
    const result = getGuidance({ age: 25, citizen: 'yes', registered: 'no' }, eciIndia)
    expect(result.title).toBe('Register to vote')
  })

  it('shows track status if registered', () => {
    const result = getGuidance({ age: 25, citizen: 'yes', registered: 'yes' }, eciIndia)
    expect(result.title).toBe('You are on track')
  })

  it('shows location step if location provided', () => {
    const result = getGuidance({ age: 25, citizen: 'yes', registered: 'yes', location: 'Delhi' }, eciIndia)
    expect(result.steps).toContain('Use your location to find the nearest polling station when maps are enabled.')
  })
})
