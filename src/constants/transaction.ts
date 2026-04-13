import type { TransactionStatus } from '@/types/transaction'

export const STATUS_LABELS: Record<TransactionStatus, string> = {
  Pending: 'Pending',
  Settled: 'Settled',
  Failed: 'Failed',
}

export const STATUS_CLASSES: Record<TransactionStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Settled: 'bg-green-100 text-green-800 border-green-200',
  Failed: 'bg-red-100 text-red-700 border-red-200',
}
