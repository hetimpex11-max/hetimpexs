import { cn } from '@/utils/cn'

interface TableProps {
  className?: string
  children: React.ReactNode
}

function Table({ className, ...props }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
}

interface TableHeaderProps {
  className?: string
  children: React.ReactNode
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn('[&_tr]:border-b', className)} {...props} />
}

interface TableBodyProps {
  className?: string
  children: React.ReactNode
}

function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

interface TableFooterProps {
  className?: string
  children: React.ReactNode
}

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn('border-t bg-gray-50/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}

interface TableRowProps {
  className?: string
  children: React.ReactNode
}

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn('border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-100', className)}
      {...props}
    />
  )
}

interface TableHeadProps {
  className?: string
  children: React.ReactNode
}

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn('h-10 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
}

interface TableCellProps {
  className?: string
  children: React.ReactNode
  colSpan?: number
}

function TableCell({ className, colSpan, ...props }: TableCellProps) {
  return (
    <td
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      colSpan={colSpan}
      {...props}
    />
  )
}

interface TableCaptionProps {
  className?: string
  children: React.ReactNode
}

function TableCaption({ className, ...props }: TableCaptionProps) {
  return <caption className={cn('mt-4 text-sm text-gray-500', className)} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
