import { formatCurrency } from '@/lib/formatters'
import type { BatchFormState } from '@/types/batch'
import type { Transaction } from '@/types/transaction'

interface UseBatchSubmitProps {
  formData: BatchFormState
  onSubmit: (transactions: Transaction[]) => void
}

export function useBatchSubmit({ formData, onSubmit }: UseBatchSubmitProps) {
  function handleSubmit() {
    const transactions: Transaction[] = formData.rows.map((validatedRow, index) => {
      const { raw, isValid, errors } = validatedRow
      const amount = parseFloat(raw.amount)

      const errorMessage = isValid
        ? undefined
        : errors.map((e) => e.message).join('; ')

      return {
        id: `${Date.now()}-${index}`,
        transactionDate: raw.transactionDate,
        accountNumber: raw.accountNumber,
        accountHolderName: raw.accountHolderName,
        amount: isNaN(amount) ? 0 : amount,
        status: isValid ? 'Pending' : 'Failed',
        errorMessage,
      } satisfies Transaction
    })

    onSubmit(transactions)
  }

  // Summary statistics derived from valid rows only
  const validRows = formData.rows.filter((r) => r.isValid)
  const totalAmount = validRows.reduce(
    (sum, r) => sum + parseFloat(r.raw.amount),
    0
  )
  const paymentCount = formData.rows.length
  const averageAmount = validRows.length > 0 ? totalAmount / validRows.length : 0

  return {
    handleSubmit,
    totalAmount,
    paymentCount,
    averageAmount,
    formattedTotal: formatCurrency(totalAmount),
    formattedAverage: formatCurrency(averageAmount),
  }
}
