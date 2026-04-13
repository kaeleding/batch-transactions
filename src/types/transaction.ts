export type TransactionStatus = 'Pending' | 'Settled' | 'Failed'

export interface Transaction {
  id: string
  transactionDate: string
  accountNumber: string
  accountHolderName: string
  amount: number
  status: TransactionStatus
  errorMessage?: string
}

export interface RawCsvRow {
  transactionDate: string
  accountNumber: string
  accountHolderName: string
  amount: string
}

export type TransactionHeaders = 'date' | 'accountNumber' | 'accountName' | 'amount' | TransactionStatus
