import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionsTableRow } from './TransactionsTableRow'
import type { Transaction } from '@/types/transaction'

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {

  function handleTransactionDateSort() {
    console.log('transaction date')
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={handleTransactionDateSort}>Transaction Date</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Account Holder Name</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <td
                colSpan={5}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                No transactions yet.
              </td>
            </TableRow>
          ) : (
            transactions.map((t) => (
              <TransactionsTableRow key={t.id} transaction={t} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
