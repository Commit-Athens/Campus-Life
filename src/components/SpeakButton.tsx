import { LoaderCircle, Pause, Volume2 } from 'lucide-react'
import { useId, useSyncExternalStore } from 'react'
import { el } from '../i18n/el'
import { getSpeechSnapshot, subscribeSpeech, toggleSpeech } from '../lib/speech'

type SpeakButtonProps = {
  /** Text ElevenLabs should read aloud. */
  text: string
  /** Short name for the button label, e.g. the card title. */
  label: string
}

/** Speaker control. One clip plays at a time; press again to stop. */
export function SpeakButton({ text, label }: SpeakButtonProps) {
  const key = useId()
  const state = useSyncExternalStore(subscribeSpeech, getSpeechSnapshot, getSpeechSnapshot)
  const mine = state.key === key
  const loading = mine && state.phase === 'loading'
  const playing = mine && state.phase === 'playing'
  const error = mine && state.phase === 'error'

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void toggleSpeech(key, text)
      }}
      aria-pressed={playing}
      aria-label={playing || loading ? el.speak.stop(label) : el.speak.play(label)}
      title={error ? (state.error ?? el.speak.error) : el.speak.play(label)}
      className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors ${
        error
          ? 'bg-error-soft text-error'
          : playing || loading
            ? 'bg-primary text-white'
            : 'bg-primary-soft text-primary hover:bg-primary/15'
      }`}
    >
      {loading ? (
        <LoaderCircle className="size-5 animate-spin" strokeWidth={2} aria-hidden />
      ) : playing ? (
        <Pause className="size-5" strokeWidth={2} aria-hidden />
      ) : (
        <Volume2 className="size-5" strokeWidth={2} aria-hidden />
      )}
    </button>
  )
}
