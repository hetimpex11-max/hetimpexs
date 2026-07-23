import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/utils/cn'

interface AvatarProps {
  className?: string
  children?: React.ReactNode
}

function Avatar({ className, children }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    >
      {children}
    </AvatarPrimitive.Root>
  )
}

interface AvatarImageProps {
  className?: string
  src?: string
  alt?: string
}

function AvatarImage({ className, src, alt }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn('aspect-square h-full w-full', className)}
      src={src}
      alt={alt}
    />
  )
}

interface AvatarFallbackProps {
  className?: string
  children: React.ReactNode
  delayMs?: number
}

function AvatarFallback({ className, children, delayMs }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-900', className)}
      delayMs={delayMs}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
