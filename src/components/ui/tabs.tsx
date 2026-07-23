import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/utils/cn'

interface TabsProps {
  className?: string
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}

function Tabs({ className, children, value, onValueChange, defaultValue }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={cn('flex flex-col', className)}
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

interface TabsListProps {
  className?: string
  children: React.ReactNode
}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500',
        className
      )}
      {...props}
    />
  )
}

interface TabsTriggerProps {
  className?: string
  value: string
  children: React.ReactNode
}

function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow',
        className
      )}
      value={value}
      {...props}
    />
  )
}

interface TabsContentProps {
  className?: string
  value: string
  children: React.ReactNode
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400',
        className
      )}
      value={value}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
