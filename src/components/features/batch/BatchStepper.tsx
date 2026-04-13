import { cn } from '@/lib/utils'
import { BATCH_STEPS } from '@/constants/batch'
import type { BatchStep } from '@/types/batch'

interface BatchStepperProps {
  currentStep: BatchStep
}

export function BatchStepper({ currentStep }: BatchStepperProps) {
  return (
    <div className="flex items-center w-full">
      {BATCH_STEPS.map(({ step, label }, index) => {
        const isCompleted = currentStep > step
        const isActive = currentStep === step

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors',
                  isCompleted && 'bg-primary border-primary text-primary-foreground',
                  isActive && 'border-primary text-primary bg-background',
                  !isActive && !isCompleted && 'border-muted-foreground/30 text-muted-foreground/50'
                )}
              >
                {isCompleted ? '✓' : step}
              </div>
              <span
                className={cn(
                  'text-xs font-medium whitespace-nowrap',
                  isActive && 'text-primary',
                  isCompleted && 'text-primary',
                  !isActive && !isCompleted && 'text-muted-foreground/50'
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector line — not rendered after last step */}
            {index < BATCH_STEPS.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-3 mb-5 transition-colors',
                  isCompleted ? 'bg-primary' : 'bg-muted-foreground/20'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
