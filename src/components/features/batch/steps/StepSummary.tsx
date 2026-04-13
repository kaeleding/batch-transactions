import { useBatchSubmit } from '@/hooks/useBatchSubmit'
import { DEFAULT_APPROVERS } from '@/constants/batch'
import type { BatchFormState } from '@/types/batch'

interface StepSummaryProps {
  formData: BatchFormState
}

interface StatCardProps {
  label: string
  value: string
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-muted/30 px-5 py-4 flex flex-col gap-1">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        {label}
      </span>
      <span className="text-1xl font-semibold tracking-tight">{value}</span>
    </div>
  )
}

export function StepSummary({ formData }: StepSummaryProps) {
  const { paymentCount, formattedTotal, formattedAverage } =
    useBatchSubmit({ formData, onSubmit: () => {} })

  const approverLabel =
    DEFAULT_APPROVERS.find((a) => a.value === formData.approver)?.label ??
    formData.approver

  return (
    <div className="space-y-6">
      {/* Batch details */}
      <div className="rounded-lg border bg-muted/20 px-5 py-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Batch Name</span>
          <span className="font-medium">{formData.batchName}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Approver</span>
          <span className="font-medium">{approverLabel}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total Amount" value={formattedTotal} />
        <StatCard label="No. of Payments" value={String(paymentCount)} />
        <StatCard label="Avg. Payment Value" value={formattedAverage} />
      </div>
    </div>
  )
}
