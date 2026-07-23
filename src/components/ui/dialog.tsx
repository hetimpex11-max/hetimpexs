import { type ReactNode } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface DialogProps {
  children?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Dialog({ children, open, onOpenChange }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  )
}

interface DialogTriggerProps {
  children?: ReactNode
  asChild?: boolean
}

function DialogTrigger({ children, asChild }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger asChild={asChild}>{children}</DialogPrimitive.Trigger>
}

interface DialogPortalProps {
  children?: ReactNode
}

function DialogPortal({ children }: DialogPortalProps) {
  return <DialogPrimitive.Portal>{children}</DialogPrimitive.Portal>
}

interface DialogOverlayProps {
  className?: string
  children?: ReactNode
}

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  )
}

interface DialogContentProps {
  className?: string
  children?: ReactNode
}

function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

interface DialogHeaderProps {
  className?: string
  children?: ReactNode
}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
}

interface DialogFooterProps {
  className?: string
  children?: ReactNode
}

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
}

interface DialogTitleProps {
  className?: string
  children?: ReactNode
}

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

interface DialogDescriptionProps {
  className?: string
  children?: ReactNode
}

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <DialogPrimitive.Description className={cn('text-sm text-gray-500', className)} {...props} />
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
