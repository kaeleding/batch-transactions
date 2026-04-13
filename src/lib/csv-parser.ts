import Papa from 'papaparse'
import type { RawCsvRow } from '@/types/transaction'

const REQUIRED_HEADERS = [
  'Transaction Date',
  'Account Number',
  'Account Holder Name',
  'Amount',
]

export class CsvParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CsvParseError'
  }
}

export function parseCsvFile(file: File): Promise<RawCsvRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const headers = results.meta.fields ?? []
        const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h))

        if (missing.length > 0) {
          reject(
            new CsvParseError(
              `Missing required columns: ${missing.join(', ')}`
            )
          )
          return
        }

        const rows: RawCsvRow[] = results.data.map((row) => ({
          transactionDate: (row['Transaction Date'] ?? '').trim(),
          accountNumber: (row['Account Number'] ?? '').trim(),
          accountHolderName: (row['Account Holder Name'] ?? '').trim(),
          amount: (row['Amount'] ?? '').trim(),
        }))

        resolve(rows)
      },
      error(err) {
        reject(new CsvParseError(err.message))
      },
    })
  })
}
