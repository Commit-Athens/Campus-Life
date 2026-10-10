import { el } from '../i18n/el'

export type VerificationErrors = { name?: string; studentId?: string }

/** Format checks only (demo): no registry lookup. Returns an empty object when valid. */
export function validateVerification(name: string, studentId: string): VerificationErrors {
  const errors: VerificationErrors = {}
  const words = name.trim().split(/\s+/).filter(Boolean)
  const id = studentId.trim()

  if (words.length === 0) errors.name = el.verify.errors.nameRequired
  else if (words.length < 2 || !words.every((w) => /^[\p{L}][\p{L}'.-]+$/u.test(w))) {
    errors.name = el.verify.errors.nameFormat
  }

  if (id === '') errors.studentId = el.verify.errors.idRequired
  else if (!/^[\p{L}0-9]{5,15}$/u.test(id) || (id.match(/[0-9]/g) ?? []).length < 5) {
    errors.studentId = el.verify.errors.idFormat
  }

  return errors
}

/** "••••0123": only the last four characters are shown. */
export function maskStudentId(id: string): string {
  return `••••${id.slice(-4)}`
}
