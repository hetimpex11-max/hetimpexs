import * as ToastPrimitive from '@radix-ui/react-toast'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = ToastPrimitive.Viewport

function Toast({ className, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <ToastPrimitive.Root
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-gray-200 p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        className
      )}
      {...props}
    />
  )
}

function ToastAction({ className, altText, ...props }: { className?: string; altText: string; children: React.ReactNode }) {
  return (
    <ToastPrimitive.Action
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      altText={altText}
      {...props}
    />
  )
}

function ToastClose({ className, ...props }: { className?: string }) {
  return (
    <ToastPrimitive.Close
      className={cn(
        'absolute right-1 top-1 rounded-md p-1 text-gray-500 opacity-0 transition-opacity hover:text-gray-900 group-hover:opacity-100 focus:opacity-100 focus:outline-none',
        className
      )}
      {...props}
    >
      <X className="h-3 w-3" />
    </ToastPrimitive.Close>
  )
}

function ToastTitle({ className, ...props }: { className?: string; children: React.ReactNode }) {
  return <ToastPrimitive.Title className={cn('text-sm font-semibold', className)} {...props} />
}

function ToastDescription({ className, ...props }: { className?: string; children: React.ReactNode }) {
  return <ToastPrimitive.Description className={cn('text-sm opacity-90', className)} {...props} />
}

function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  )
}

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Toaster,
}
