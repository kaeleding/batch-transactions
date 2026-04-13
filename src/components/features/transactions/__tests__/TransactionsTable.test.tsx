import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TransactionsTable } from '../TransactionsTable'
import type { Transaction } from '@/types/transaction'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    transactionDate: '2025-02-20',
    accountNumber: '000-123456789-01',
    accountHolderName: 'John Doe',
    amount: 100,
    status: 'Pending',
  },
  {
    id: '2',
    transactionDate: '2025-03-01',
    accountNumber: '000-111222333-03',
    accountHolderName: 'Alex Johnson',
    amount: 50,
    status: 'Failed',
    errorMessage: 'Insufficient funds',
  },
]

function renderTable(transactions: Transaction[]) {
  return render(
    <TooltipProvider>
      <TransactionsTable transactions={transactions} />
    </TooltipProvider>
  )
}

describe('TransactionsTable', () => {
  it('renders column headers', () => {
    renderTable([])
    expect(screen.getByText('Transaction Date')).toBeInTheDocument()
    expect(screen.getByText('Account Number')).toBeInTheDocument()
    expect(screen.getByText('Account Holder Name')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('shows empty state when no transactions', () => {
    renderTable([])
    expect(screen.getByText('No transactions yet.')).toBeInTheDocument()
  })

  it('renders a row for each transaction', () => {
    renderTable(mockTransactions)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument()
  })

  it('shows Pending and Failed status badges', () => {
    renderTable(mockTransactions)
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Failed')).toBeInTheDocument()
  })
})
