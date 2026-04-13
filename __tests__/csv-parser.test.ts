import { describe, it, expect } from 'vitest'
import { parseCsvFile, CsvParseError } from '@/lib/csv-parser'

function makeFile(content: string, name = 'test.csv'): File {
  return new File([content], name, { type: 'text/csv' })
}

const VALID_CSV = `Transaction Date,Account Number,Account Holder Name,Amount
2025-02-20,000-123456789-01,John Doe,100.00
2025-02-21,000-987654321-02,Jane Smith,250.50`

describe('parseCsvFile', () => {
  it('parses a valid CSV into RawCsvRow array', async () => {
    const rows = await parseCsvFile(makeFile(VALID_CSV))
    expect(rows).toHaveLength(2)
    expect(rows[0]).toEqual({
      transactionDate: '2025-02-20',
      accountNumber: '000-123456789-01',
      accountHolderName: 'John Doe',
      amount: '100.00',
    })
  })

  it('trims whitespace from field values', async () => {
    const csv = `Transaction Date,Account Number,Account Holder Name,Amount
  2025-02-20 , 000-123456789-01 , John Doe , 100.00 `
    const rows = await parseCsvFile(makeFile(csv))
    expect(rows[0].transactionDate).toBe('2025-02-20')
    expect(rows[0].amount).toBe('100.00')
  })

  it('skips empty lines', async () => {
    const csv = `Transaction Date,Account Number,Account Holder Name,Amount
2025-02-20,000-123456789-01,John Doe,100.00

2025-02-21,000-987654321-02,Jane Smith,250.50`
    const rows = await parseCsvFile(makeFile(csv))
    expect(rows).toHaveLength(2)
  })

  it('throws CsvParseError when a required column is missing', async () => {
    const csv = `Date,Account Number,Account Holder Name,Amount
2025-02-20,000-123456789-01,John Doe,100.00`
    await expect(parseCsvFile(makeFile(csv))).rejects.toThrow(CsvParseError)
    await expect(parseCsvFile(makeFile(csv))).rejects.toThrow(
      'Missing required columns: Transaction Date'
    )
  })

  it('throws CsvParseError when multiple required columns are missing', async () => {
    const csv = `Date,Acc,Name,Value\n2025-02-20,123,John,100`
    await expect(parseCsvFile(makeFile(csv))).rejects.toThrow(CsvParseError)
  })
})
