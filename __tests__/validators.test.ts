import { describe, it, expect } from 'vitest'
import { validateRow } from '@/lib/validators'
import type { RawCsvRow } from '@/types/transaction'

const validRow: RawCsvRow = {
  transactionDate: '2025-02-20',
  accountNumber: '000-123456789-01',
  accountHolderName: 'John Doe',
  amount: '100.00',
}

describe('validateRow', () => {
  it('returns isValid=true for a fully valid row', () => {
    const result = validateRow(validRow)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  describe('transactionDate', () => {
    it('rejects a date with slashes', () => {
      const result = validateRow({ ...validRow, transactionDate: '2025/02/21' })
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual(
        expect.objectContaining({ field: 'transactionDate' })
      )
    })

    it('rejects a non-existent calendar date', () => {
      const result = validateRow({ ...validRow, transactionDate: '2025-02-30' })
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual(
        expect.objectContaining({ field: 'transactionDate' })
      )
    })

    it('rejects a plain invalid string', () => {
      const result = validateRow({ ...validRow, transactionDate: 'invalid-date' })
      expect(result.isValid).toBe(false)
    })

    it('accepts a valid ISO date', () => {
      const result = validateRow({ ...validRow, transactionDate: '2025-03-01' })
      expect(result.errors.find((e) => e.field === 'transactionDate')).toBeUndefined()
    })
  })

  describe('accountNumber', () => {
    it('rejects a number without dashes', () => {
      const result = validateRow({ ...validRow, accountNumber: '00012345678901' })
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual(
        expect.objectContaining({ field: 'accountNumber' })
      )
    })

    it('rejects a number with a letter', () => {
      const result = validateRow({ ...validRow, accountNumber: '000-123456789-0A' })
      expect(result.isValid).toBe(false)
    })

    it('accepts a correctly formatted account number', () => {
      const result = validateRow({ ...validRow, accountNumber: '000-987654321-02' })
      expect(result.errors.find((e) => e.field === 'accountNumber')).toBeUndefined()
    })
  })

  describe('accountHolderName', () => {
    it('rejects an empty name', () => {
      const result = validateRow({ ...validRow, accountHolderName: '' })
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual(
        expect.objectContaining({ field: 'accountHolderName' })
      )
    })

    it('rejects a whitespace-only name', () => {
      const result = validateRow({ ...validRow, accountHolderName: '   ' })
      expect(result.isValid).toBe(false)
    })
  })

  describe('amount', () => {
    it('rejects a negative amount', () => {
      const result = validateRow({ ...validRow, amount: '-50.00' })
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual(
        expect.objectContaining({ field: 'amount' })
      )
    })

    it('rejects zero', () => {
      const result = validateRow({ ...validRow, amount: '0' })
      expect(result.isValid).toBe(false)
    })

    it('rejects non-numeric text', () => {
      const result = validateRow({ ...validRow, amount: 'abc' })
      expect(result.isValid).toBe(false)
    })

    it('accepts a positive integer', () => {
      const result = validateRow({ ...validRow, amount: '200' })
      expect(result.errors.find((e) => e.field === 'amount')).toBeUndefined()
    })

    it('accepts a positive decimal', () => {
      const result = validateRow({ ...validRow, amount: '250.50' })
      expect(result.errors.find((e) => e.field === 'amount')).toBeUndefined()
    })
  })

  it('collects multiple errors on a fully invalid row', () => {
    const result = validateRow({
      transactionDate: 'invalid-date',
      accountNumber: '00012345678901',
      accountHolderName: '',
      amount: '-50.00',
    })
    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(4)
  })
})
