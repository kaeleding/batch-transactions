import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate } from '@/lib/formatters'

describe('formatCurrency', () => {
  it('formats a whole number as USD', () => {
    expect(formatCurrency(100)).toBe('$100.00')
  })

  it('formats a decimal as USD', () => {
    expect(formatCurrency(250.5)).toBe('$250.50')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats a large number with commas', () => {
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89')
  })
})

describe('formatDate', () => {
  it('formats an ISO date string to readable form', () => {
    const result = formatDate('2025-02-20')
    expect(result).toMatch(/Feb/)
    expect(result).toMatch(/2025/)
    expect(result).toMatch(/20/)
  })

  it('formats a different month correctly', () => {
    const result = formatDate('2025-12-01')
    expect(result).toMatch(/Dec/)
    expect(result).toMatch(/2025/)
  })

  it('returns the raw string when the date is invalid', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date')
    expect(formatDate('2025/02/21')).toBe('2025/02/21')
  })
})
