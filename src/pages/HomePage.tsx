import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TransactionsTable } from '@/components/features/transactions/TransactionsTable'
import { BatchTransferModal } from '@/components/features/batch/BatchTransferModal'
import { useTransactions } from '@/hooks/useTransactions'
import type { Transaction } from '@/types/transaction'

export function HomePage() {
  const { transactions, addTransactions } = useTransactions()
  const [modalOpen, setModalOpen] = useState(false)

  function handleBatchSubmit(incoming: Transaction[]) {
    addTransactions(incoming)
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Batch Transactions
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage all transaction records
            </p>
          </div>
          <Button onClick={() => setModalOpen(true)}>+ Batch Transfer</Button>
        </div>

        <TransactionsTable transactions={transactions} />
      </div>

      <BatchTransferModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleBatchSubmit}
      />
    </div>
  )
}
