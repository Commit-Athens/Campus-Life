import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { label: string }

export function TextInput({ label, id, className = '', ...props }: TextInputProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      <span className="text-caption font-medium">{label}</span>
      <input
        id={id}
        className={`min-h-12 rounded-full bg-surface px-4 text-body outline-none placeholder:text-muted focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      />
    </label>
  )
}
