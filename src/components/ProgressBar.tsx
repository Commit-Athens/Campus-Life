type ProgressBarProps = {
  value: number
  max: number
  label: string
}

/** Horizontal progress bar; turns `success` when complete. */
export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="h-2 w-full overflow-hidden rounded-full bg-surface"
    >
      <div
        className={`h-full rounded-full transition-[width] duration-300 ${percent === 100 ? 'bg-success' : 'bg-primary'}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
