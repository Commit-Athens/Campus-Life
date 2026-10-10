import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'inverse'

const base =
  'flex min-h-12 w-full items-center justify-center rounded-full px-6 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'border-2 border-primary bg-card text-primary hover:bg-primary-soft',
  inverse: 'bg-white text-night hover:bg-white/90',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props} />
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; href: string }

/** External link styled as a Button. Opens in a new tab. */
export function ButtonLink({ variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return (
    <a target="_blank" rel="noreferrer" className={`${base} ${variants[variant]} ${className}`} {...props} />
  )
}
