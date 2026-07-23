import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/utils/cn'

interface LabelProps {
  className?: string
  children?: React.ReactNode
  htmlFor?: string
}

function Label({ className, children, htmlFor }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
      htmlFor={htmlFor}
    >
      {children}
    </LabelPrimitive.Root>
  )
}

export { Label }
