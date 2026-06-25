type SegmentDisplayProps = {
  children: string
  className?: string
  glow?: 'green' | 'amber' | 'purple'
  size?: 'sm' | 'md' | 'lg'
}

const glowClass = {
  green: 'seg-glow-green',
  amber: 'seg-glow-amber',
  purple: 'seg-glow-purple',
} as const

const sizeClass = {
  sm: 'seg-sm',
  md: 'seg-md',
  lg: 'seg-lg',
} as const

export function SegmentDisplay({
  children,
  className = '',
  glow = 'green',
  size = 'md',
}: SegmentDisplayProps) {
  return (
    <span className={`seg-display ${glowClass[glow]} ${sizeClass[size]} ${className}`.trim()} aria-hidden="true">
      {children}
    </span>
  )
}
