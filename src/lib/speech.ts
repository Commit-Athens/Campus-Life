import { playSpeech } from './elevenlabs'

export type SpeechPhase = 'idle' | 'loading' | 'playing' | 'error'

type SpeechSnapshot = {
  key: string | null
  phase: SpeechPhase
  error: string | null
}

const idle: SpeechSnapshot = { key: null, phase: 'idle', error: null }

let snapshot: SpeechSnapshot = idle
let audio: HTMLAudioElement | null = null
let generation = 0
const listeners = new Set<() => void>()

function emit(next: SpeechSnapshot) {
  snapshot = next
  for (const listener of listeners) listener()
}

function cancel() {
  generation += 1
  if (audio) {
    audio.pause()
    const src = audio.src
    audio.src = ''
    if (src.startsWith('blob:')) URL.revokeObjectURL(src)
    audio = null
  }
}

export function getSpeechSnapshot(): SpeechSnapshot {
  return snapshot
}

export function subscribeSpeech(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function stopSpeech() {
  cancel()
  emit(idle)
}

/** Play `text` for this control, or stop if that control is already speaking. */
export async function toggleSpeech(key: string, text: string) {
  const active = snapshot.key === key && (snapshot.phase === 'loading' || snapshot.phase === 'playing')
  if (active) {
    stopSpeech()
    return
  }

  cancel()
  const mine = generation
  const spoken = text.trim().slice(0, 2400)
  if (!spoken) return

  emit({ key, phase: 'loading', error: null })
  try {
    const next = await playSpeech({ text: spoken })
    if (mine !== generation) {
      next.pause()
      if (next.src.startsWith('blob:')) URL.revokeObjectURL(next.src)
      return
    }
    audio = next
    emit({ key, phase: 'playing', error: null })
    next.addEventListener(
      'ended',
      () => {
        if (mine !== generation) return
        if (next.src.startsWith('blob:')) URL.revokeObjectURL(next.src)
        audio = null
        emit(idle)
      },
      { once: true },
    )
  } catch (err) {
    if (mine !== generation) return
    emit({
      key,
      phase: 'error',
      error: err instanceof Error ? err.message : null,
    })
  }
}
