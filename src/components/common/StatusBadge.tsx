import { Badge } from '@/components/ui/badge'
import { STATUS_CLASSES, STATUS_LABELS } from '@/constants/transaction'
import type { TransactionStatus } from '@/types/transaction'

interface StatusBadgeProps {
  status: TransactionStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={STATUS_CLASSES[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
