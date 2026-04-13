import type { CellError, ValidatedRow } from '@/types/batch'
import type { RawCsvRow } from '@/types/transaction'

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const ACCOUNT_NUMBER_REGEX = /^\d{3}-\d{9}-\d{2}$/
const POSITIVE_DECIMAL_REGEX = /^\d+(\.\d+)?$/

function isValidCalendarDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  return (
    !isNaN(date.getTime()) &&
    date.toISOString().startsWith(dateStr)
  )
}

export function validateRow(row: RawCsvRow): ValidatedRow {
  const errors: CellError[] = []

  if (!ISO_DATE_REGEX.test(row.transactionDate)) {
    errors.push({
      field: 'transactionDate',
      message: 'Date must be in YYYY-MM-DD format',
    })
  } else if (!isValidCalendarDate(row.transactionDate)) {
    errors.push({
      field: 'transactionDate',
      message: 'Date is not a valid calendar date',
    })
  }

  if (!ACCOUNT_NUMBER_REGEX.test(row.accountNumber)) {
    errors.push({
      field: 'accountNumber',
      message: 'Account number must match pattern 000-000000000-00',
    })
  }

  if (!row.accountHolderName.trim()) {
    errors.push({
      field: 'accountHolderName',
      message: 'Account holder name must not be empty',
    })
  }

  if (!POSITIVE_DECIMAL_REGEX.test(row.amount) || parseFloat(row.amount) <= 0) {
    errors.push({
      field: 'amount',
      message: 'Amount must be a positive number',
    })
  }

  return { raw: row, errors, isValid: errors.length === 0 }
}
