import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ErrorTooltip } from '@/components/common/ErrorTooltip'
import { cn } from '@/lib/utils'
import type { ValidatedRow } from '@/types/batch'
import type { RawCsvRow } from '@/types/transaction'

interface StepReviewRecordsProps {
  rows: ValidatedRow[]
}

function getCellError(row: ValidatedRow, field: keyof RawCsvRow) {
  return row.errors.find((e) => e.field === field)
}

function CellWithError({
  value,
  error,
}: {
  value: string
  error: { message: string } | undefined
}) {
  return (
    <span className={cn(error && 'text-destructive font-medium')}>
      {value || <span className="italic text-muted-foreground">(empty)</span>}
      {error && <ErrorTooltip message={error.message} />}
    </span>
  )
}

export function StepReviewRecords({ rows }: StepReviewRecordsProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No records to review.
      </p>
    )
  }

  const invalidCount = rows.filter((r) => !r.isValid).length

  return (
    <div className="space-y-4">
      {invalidCount > 0 && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-2.5 text-sm text-destructive">
          {invalidCount} row{invalidCount > 1 ? 's have' : ' has'} validation
          errors. You can still proceed — invalid rows will be marked as{' '}
          <strong>Failed</strong>.
        </div>
      )}

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Transaction Date</TableHead>
              <TableHead className="whitespace-nowrap">Account Number</TableHead>
              <TableHead>Account Holder Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Valid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                className={cn(!row.isValid && 'bg-destructive/5')}
              >
                <TableCell className="whitespace-nowrap">
                  <CellWithError
                    value={row.raw.transactionDate}
                    error={getCellError(row, 'transactionDate')}
                  />
                </TableCell>
                <TableCell className="font-mono text-sm whitespace-nowrap">
                  <CellWithError
                    value={row.raw.accountNumber}
                    error={getCellError(row, 'accountNumber')}
                  />
                </TableCell>
                <TableCell>
                  <CellWithError
                    value={row.raw.accountHolderName}
                    error={getCellError(row, 'accountHolderName')}
                  />
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <CellWithError
                    value={row.raw.amount}
                    error={getCellError(row, 'amount')}
                  />
                </TableCell>
                <TableCell className="text-center">
                  {row.isValid ? '✅' : '❌'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
