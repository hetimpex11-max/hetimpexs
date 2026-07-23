import { cn } from '@/utils/cn'

function Badge({ className, variant = 'default', ...props }: { className?: string; variant?: 'default' | 'secondary' | 'destructive' | 'outline'; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
        {
          'border-transparent bg-gray-900 text-white shadow hover:bg-gray-800': variant === 'default',
          'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
          'border-transparent bg-red-500 text-white shadow hover:bg-red-600': variant === 'destructive',
          'border-gray-200 text-gray-900': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
