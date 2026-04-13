import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { BatchStepper } from './BatchStepper'
import { BatchModalFooter } from './BatchModalFooter'
import { StepTransferDetails } from './steps/StepTransferDetails'
import { StepReviewRecords } from './steps/StepReviewRecords'
import { StepSummary } from './steps/StepSummary'
import { useBatchStepper } from '@/hooks/useBatchStepper'
import { useCsvUpload } from '@/hooks/useCsvUpload'
import { useBatchSubmit } from '@/hooks/useBatchSubmit'
import type { Transaction } from '@/types/transaction'

interface BatchTransferModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (transactions: Transaction[]) => void
}

export function BatchTransferModal({
  open,
  onOpenChange,
  onSubmit,
}: BatchTransferModalProps) {
  const { currentStep, formData, dispatch } = useBatchStepper()
  const { rows, parseError, handleFileChange, reset: resetUpload } = useCsvUpload()
  const { handleSubmit } = useBatchSubmit({ formData, onSubmit })

  useEffect(() => {
    if (open) {
      dispatch({ type: 'RESET' })
      resetUpload()
    }
  }, [open])

  function handleClose(isOpen: boolean) {
    onOpenChange(isOpen)
  }

  function handleNext() {
    if (currentStep === 1) {
      dispatch({ type: 'SET_ROWS', payload: rows })
    }
    dispatch({ type: 'NEXT_STEP' })
  }

  function handleBack() {
    dispatch({ type: 'PREV_STEP' })
  }

  // Step 1: all three fields filled and file parsed without errors
  // Step 2: always allowed to proceed to summary
  // Step 3: submit
  function canProceed(): boolean {
    if (currentStep === 1) {
      return (
        formData.batchName.trim() !== '' &&
        formData.approver !== '' &&
        rows.length > 0 &&
        parseError === null
      )
    }
    return true
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[70vw] max-h-[90vh] flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Batch Transfer</DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-4">
          <BatchStepper currentStep={currentStep} />
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {currentStep === 1 && (
            <StepTransferDetails
              formData={formData}
              parseError={parseError}
              onDetailsChange={(details) =>
                dispatch({ type: 'SET_DETAILS', payload: details })
              }
              onFileChange={handleFileChange}
            />
          )}
          {currentStep === 2 && (
            <StepReviewRecords rows={rows} />
          )}
          {currentStep === 3 && (
            <StepSummary formData={formData} />
          )}
        </div>

        <div className="px-6 pb-6">
          <BatchModalFooter
            currentStep={currentStep}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            canProceed={canProceed()}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
