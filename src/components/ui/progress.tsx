import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/utils/cn'

function Progress({ className, value, ...props }: { className?: string; value?: number }) {
  return (
    <ProgressPrimitive.Root
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-100', className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-gray-900 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
