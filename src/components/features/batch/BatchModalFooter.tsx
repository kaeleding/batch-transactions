import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { BatchStep } from '@/types/batch'

interface BatchModalFooterProps {
  currentStep: BatchStep
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
  canProceed: boolean
}

export function BatchModalFooter({
  currentStep,
  onNext,
  onBack,
  onSubmit,
  canProceed,
}: BatchModalFooterProps) {
  return (
    <div>
      <Separator />
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 1}
        >
          ← Back
        </Button>

        {currentStep < 3 ? (
          <Button onClick={onNext} disabled={!canProceed}>
            Next →
          </Button>
        ) : (
          <Button onClick={onSubmit} disabled={!canProceed}>
            ✓ Submit
          </Button>
        )}
      </div>
    </div>
  )
}
