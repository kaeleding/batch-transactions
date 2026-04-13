import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StepReviewRecords } from '../steps/StepReviewRecords'
import { validateRow } from '@/lib/validators'
import type { RawCsvRow } from '@/types/transaction'

function makeRows(rawRows: RawCsvRow[]) {
  return rawRows.map(validateRow)
}

function renderStep(rawRows: RawCsvRow[]) {
  return render(
    <TooltipProvider>
      <StepReviewRecords rows={makeRows(rawRows)} />
    </TooltipProvider>
  )
}

describe('StepReviewRecords', () => {
  it('shows empty state when no rows', () => {
    renderStep([])
    expect(screen.getByText('No records to review.')).toBeInTheDocument()
  })

  it('renders a row for each CSV record', () => {
    renderStep([
      { transactionDate: '2025-02-20', accountNumber: '000-123456789-01', accountHolderName: 'John Doe', amount: '100.00' },
      { transactionDate: '2025-02-21', accountNumber: '000-987654321-02', accountHolderName: 'Jane Smith', amount: '250.50' },
    ])
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('shows a warning banner when rows have errors', () => {
    renderStep([
      { transactionDate: 'invalid-date', accountNumber: '000-123456789-01', accountHolderName: 'John Doe', amount: '100.00' },
    ])
    expect(screen.getByText(/validation errors/i)).toBeInTheDocument()
  })

  it('shows ✅ for valid rows and ❌ for invalid rows', () => {
    renderStep([
      { transactionDate: '2025-02-20', accountNumber: '000-123456789-01', accountHolderName: 'John Doe', amount: '100.00' },
      { transactionDate: 'bad-date', accountNumber: '000-123456789-01', accountHolderName: 'Jane', amount: '50.00' },
    ])
    expect(screen.getByText('✅')).toBeInTheDocument()
    expect(screen.getByText('❌')).toBeInTheDocument()
  })
})
