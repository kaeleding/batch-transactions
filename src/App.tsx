import { TooltipProvider } from '@/components/ui/tooltip'
import { HomePage } from '@/pages/HomePage'

export default function App() {
  return (
    <TooltipProvider>
      <HomePage />
    </TooltipProvider>
  )
}
