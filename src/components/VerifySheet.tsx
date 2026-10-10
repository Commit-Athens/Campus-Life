import { useState, type FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import { usePoints } from '../hooks/usePoints'
import { el } from '../i18n/el'
import { validateVerification, type VerificationErrors } from '../lib/verification'
import { Button } from './Button'
import { Sheet } from './Sheet'
import { TextInput } from './TextInput'

/** Demo student verification form: full name + student card ID, format checks only. */
export function VerifySheet({ onClose }: { onClose: () => void }) {
  const { account, verify } = useAuth()
  const { award } = usePoints()
  const [name, setName] = useState(account?.name ?? '')
  const [studentId, setStudentId] = useState('')
  const [errors, setErrors] = useState<VerificationErrors>({})

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateVerification(name, studentId)
    setErrors(found)
    if (found.name || found.studentId || !account) return
    verify(name, studentId)
    award(`verify:${account.email}`)
    onClose()
  }

  return (
    <Sheet title={el.verify.title} onClose={onClose}>
      <p className="text-caption text-muted">{el.verify.intro}</p>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <TextInput
            id="verify-name"
            label={el.verify.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'verify-name-error' : undefined}
          />
          {errors.name && (
            <p id="verify-name-error" className="px-4 text-caption text-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <TextInput
            id="verify-student-id"
            label={el.verify.studentId}
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            autoComplete="off"
            inputMode="text"
            aria-invalid={Boolean(errors.studentId)}
            aria-describedby="verify-student-id-help"
          />
          <p id="verify-student-id-help" className={`px-4 text-caption ${errors.studentId ? 'text-error' : 'text-muted'}`}>
            {errors.studentId ?? el.verify.studentIdHint}
          </p>
        </div>
        <Button type="submit">{el.verify.submit}</Button>
      </form>
      <p className="text-caption text-muted">{el.verify.demoNotice}</p>
    </Sheet>
  )
}
