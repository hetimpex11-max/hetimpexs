import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SelectProps {
  children?: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Select({ children, value, onValueChange, defaultValue, open, onOpenChange }: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </SelectPrimitive.Root>
  )
}

function SelectGroup({ ...props }: { children: React.ReactNode }) {
  return <SelectPrimitive.Group {...props} />
}

function SelectValue({ ...props }: { children?: React.ReactNode; placeholder?: string }) {
  return <SelectPrimitive.Value {...props} />
}

interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
}

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

interface SelectContentProps {
  className?: string
  children: React.ReactNode
}

function SelectContent({ className, children, ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-900 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

interface SelectLabelProps {
  className?: string
  children: React.ReactNode
}

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return <SelectPrimitive.Label className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
}

interface SelectItemProps {
  className?: string
  children: React.ReactNode
  value: string
}

function SelectItem({ className, children, value, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      value={value}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

interface SelectSeparatorProps {
  className?: string
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-gray-100', className)} {...props} />
}

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }
