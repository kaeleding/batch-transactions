import { TableCell, TableRow } from '@/components/ui/table'
import { ErrorTooltip } from '@/components/common/ErrorTooltip'
import { StatusBadge } from '@/components/common/StatusBadge'
import { formatCurrency, formatDate } from '@/lib/formatters'
import type { Transaction } from '@/types/transaction'

interface TransactionsTableRowProps {
  transaction: Transaction
}

export function TransactionsTableRow({ transaction }: TransactionsTableRowProps) {
  return (
    <TableRow>
      <TableCell>{formatDate(transaction.transactionDate)}</TableCell>
      <TableCell className="font-mono text-sm">{transaction.accountNumber}</TableCell>
      <TableCell>{transaction.accountHolderName}</TableCell>
      <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <StatusBadge status={transaction.status} />
          {transaction.status === 'Failed' && transaction.errorMessage && (
            <ErrorTooltip message={transaction.errorMessage} />
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
