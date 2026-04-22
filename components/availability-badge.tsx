import { cn } from '@/lib/utils'
import type { Availability } from '@/lib/mock-data'

interface AvailabilityBadgeProps {
  availability: Availability
  size?: 'sm' | 'md'
}

const availabilityConfig = {
  open: {
    label: 'Open to work',
    className: 'bg-green-100 text-green-800 border-green-200',
    dotClassName: 'bg-green-500',
  },
  passive: {
    label: 'Open to opportunities',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
    dotClassName: 'bg-amber-500',
  },
  'not-looking': {
    label: 'Not looking',
    className: 'bg-gray-100 text-gray-600 border-gray-200',
    dotClassName: 'bg-gray-400',
  },
}

export function AvailabilityBadge({ availability, size = 'md' }: AvailabilityBadgeProps) {
  const config = availabilityConfig[availability]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <span className={cn('h-2 w-2 rounded-full', config.dotClassName)} />
      {config.label}
    </span>
  )
}
