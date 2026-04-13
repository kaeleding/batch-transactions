import type { RawCsvRow } from './transaction'

export type BatchStep = 1 | 2 | 3

export interface CellError {
  field: keyof RawCsvRow
  message: string
}

export interface ValidatedRow {
  raw: RawCsvRow
  errors: CellError[]
  isValid: boolean
}

export interface BatchFormState {
  batchName: string
  approver: string
  file: File | null
  rows: ValidatedRow[]
}

export interface ApproverOption {
  value: string
  label: string
}
