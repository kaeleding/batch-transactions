import { AlertCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ErrorTooltipProps {
  message: string
}

export function ErrorTooltip({ message }: ErrorTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <AlertCircle
          className="inline-block ml-1.5 text-destructive cursor-help"
          size={14}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  )
}
