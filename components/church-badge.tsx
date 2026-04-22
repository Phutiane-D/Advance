import { Church } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChurchBadgeProps {
  churchName: string
  size?: 'sm' | 'md'
  className?: string
}

export function ChurchBadge({ churchName, size = 'md', className }: ChurchBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      <Church className={cn(size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />
      <span className="font-medium">{churchName}</span>
    </span>
  )
}
