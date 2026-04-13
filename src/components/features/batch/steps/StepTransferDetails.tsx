import { useRef } from 'react'
import { Upload, FileCheck, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DEFAULT_APPROVERS } from '@/constants/batch'
import type { BatchFormState } from '@/types/batch'

interface StepTransferDetailsProps {
  formData: BatchFormState
  parseError: string | null
  onDetailsChange: (details: Pick<BatchFormState, 'batchName' | 'approver' | 'file'>) => void
  onFileChange: (file: File | null) => void
}

export function StepTransferDetails({
  formData,
  parseError,
  onDetailsChange,
  onFileChange,
}: StepTransferDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | null) {
    onDetailsChange({ ...formData, file })
    onFileChange(file)
  }

  return (
    <div className="space-y-6">
      {/* Batch Transfer Name */}
      <div className="space-y-2">
        <Label htmlFor="batch-name">Batch Transfer Name</Label>
        <Input
          id="batch-name"
          placeholder="e.g. February Payroll"
          value={formData.batchName}
          onChange={(e) =>
            onDetailsChange({ ...formData, batchName: e.target.value })
          }
        />
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label>Upload CSV File</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />

        {!formData.file ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
          >
            <Upload size={24} />
            <span className="text-sm font-medium">
              Drag & drop or click to upload
            </span>
            <span className="text-xs">.csv files only</span>
          </button>
        ) : (
          <div
            className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
              parseError ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/40'
            }`}
          >
            <div className="flex items-center gap-2 text-sm">
              <FileCheck size={16} className={parseError ? 'text-destructive' : 'text-primary'} />
              <span className="font-medium">{formData.file.name}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.value = ''
                handleFile(null)
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {parseError && (
          <p className="text-sm text-destructive">{parseError}</p>
        )}
      </div>

      {/* Approver */}
      <div className="space-y-2">
        <Label htmlFor="approver">Approver</Label>
        <Select
          value={formData.approver}
          onValueChange={(value) =>
            onDetailsChange({ ...formData, approver: value ?? '' })
          }
        >
          <SelectTrigger id="approver">
            <SelectValue placeholder="Select approver..." />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_APPROVERS.map((approver) => (
              <SelectItem key={approver.value} value={approver.value}>
                {approver.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
