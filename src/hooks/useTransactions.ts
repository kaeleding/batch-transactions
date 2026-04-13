import { useState } from 'react'
import type { Transaction } from '@/types/transaction'

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    transactionDate: '2025-02-20',
    accountNumber: '000-123456789-01',
    accountHolderName: 'John Doe',
    amount: 100.0,
    status: 'Pending',
  },
  {
    id: '2',
    transactionDate: '2025-02-21',
    accountNumber: '000-987654321-02',
    accountHolderName: 'Jane Smith',
    amount: 250.5,
    status: 'Settled',
  },
  {
    id: '3',
    transactionDate: '2025-03-01',
    accountNumber: '000-111222333-03',
    accountHolderName: 'Alex Johnson',
    amount: 50.0,
    status: 'Failed',
    errorMessage: 'Insufficient funds in source account',
  },
  {
    id: '4',
    transactionDate: '2025-03-05',
    accountNumber: '000-444555666-04',
    accountHolderName: 'Maria Garcia',
    amount: 320.0,
    status: 'Settled',
  },
]

export function useTransactions() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS)

  function addTransactions(incoming: Transaction[]) {
    setTransactions((prev) => [...prev, ...incoming])
  }

  return { transactions, addTransactions }
}
