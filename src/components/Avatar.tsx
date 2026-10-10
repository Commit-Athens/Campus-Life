import { avatarFor } from '../data/avatars'

type AvatarProps = {
  name: string
  /** Image to show; defaults to the sample avatar for `name`, then to coloured initials. */
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'size-8 text-xs',
  md: 'size-11 text-caption',
  lg: 'size-14 text-h3',
}

const tones = [
  'bg-primary-soft text-primary',
  'bg-success-soft text-success',
  'bg-warning-soft text-warning',
  'bg-error-soft text-error',
]

const skipWords = new Set(['και', 'της', 'του', 'των'])

/** Up to two initials, without Greek accents: "Μαρία Κ." -> "ΜΚ". */
function initials(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/\s+/)
    .filter((word) => word && !skipWords.has(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

/** Same name, same colour. */
function toneFor(name: string): string {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return tones[hash % tones.length]
}

/** Round profile picture: photo or illustration when there is one, coloured initials otherwise. Decorative: the name is always shown next to it. */
export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const image = src ?? avatarFor(name)
  if (image) {
    return <img src={image} alt="" className={`${sizes[size]} shrink-0 rounded-full bg-surface object-cover`} />
  }
  return (
    <span
      className={`${sizes[size]} ${toneFor(name)} flex shrink-0 items-center justify-center rounded-full font-semibold`}
      aria-hidden
    >
      {initials(name)}
    </span>
  )
}
