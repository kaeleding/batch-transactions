import type { ApproverOption } from '@/types/batch'

export const BATCH_STEPS: { step: number; label: string }[] = [
  { step: 1, label: 'Transfer Details' },
  { step: 2, label: 'Review Records' },
  { step: 3, label: 'Summary' },
]

export const DEFAULT_APPROVERS: ApproverOption[] = [
  { value: 'sarah-connor', label: 'Sarah Connor' },
  { value: 'john-reese', label: 'John Reese' },
  { value: 'diana-prince', label: 'Diana Prince' },
  { value: 'bruce-wayne', label: 'Bruce Wayne' },
  { value: 'tony-stark', label: 'Tony Stark' },
]
