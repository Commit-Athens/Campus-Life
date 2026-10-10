export type TtsRequest = {
  text: string
  voiceId?: string
  modelId?: string
}

/** Call the CampusLife Worker proxy (keeps the ElevenLabs key server-side). */
export async function synthesizeSpeech(req: TtsRequest): Promise<Blob> {
  const res = await fetch('/api/elevenlabs/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })

  if (!res.ok) {
    let detail = res.statusText
    try {
      const data = (await res.json()) as { error?: string; detail?: string }
      detail = data.detail || data.error || detail
    } catch {
      /* ignore */
    }
    throw new Error(detail)
  }

  return res.blob()
}

export async function playSpeech(req: TtsRequest): Promise<HTMLAudioElement> {
  const blob = await synthesizeSpeech(req)
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  audio.addEventListener('ended', () => URL.revokeObjectURL(url), { once: true })
  await audio.play()
  return audio
}
