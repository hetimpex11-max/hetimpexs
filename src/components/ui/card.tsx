import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

function Card({ className, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('rounded-xl border border-gray-200 bg-white shadow-sm', className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

function CardTitle({ className, ...props }: { className?: string; children: ReactNode }) {
  return <h3 className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
}

function CardDescription({ className, ...props }: { className?: string; children: ReactNode }) {
  return <p className={cn('text-sm text-gray-500', className)} {...props} />
}

function CardContent({ className, ...props }: { className?: string; children: ReactNode }) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

function CardFooter({ className, ...props }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
