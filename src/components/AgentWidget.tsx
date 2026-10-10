import { MessageCircle, Send, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { askCampus } from '../lib/agent'
import { SpeakButton } from './SpeakButton'

type Message = {
  id: string
  role: 'user' | 'agent'
  text: string
}

/** Floating campus assistant. Answers in text from sample data; each line can be read aloud. */
export function AgentWidget() {
  const { university } = useUniversity()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const titleId = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const shown: Message[] = [
    { id: 'welcome', role: 'agent', text: el.agent.greeting(university.shortName) },
    ...messages,
  ]

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages, open])

  const send = (text: string) => {
    const question = text.trim()
    if (!question) return
    setDraft('')
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: question },
      { id: `a-${Date.now()}`, role: 'agent', text: askCampus(question, university) },
    ])
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    send(draft)
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-30 flex justify-center">
      <div className="flex w-full max-w-md flex-col items-end gap-3 px-4">
        {open && (
          <section
            aria-labelledby={titleId}
            className="pointer-events-auto flex max-h-[min(70dvh,32rem)] w-full flex-col overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-surface"
          >
            <header className="flex items-start gap-3 border-b border-surface p-4">
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-h3">
                  {el.agent.title}
                </h2>
                <p className="text-caption text-muted">{el.agent.demo}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={el.common.close}
                className="flex size-11 items-center justify-center rounded-full text-ink hover:bg-page"
              >
                <X className="size-5" strokeWidth={2} aria-hidden />
              </button>
            </header>

            <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {shown.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                      message.role === 'user' ? 'bg-primary text-white' : 'bg-page text-ink'
                    }`}
                  >
                    {message.text}
                  </p>
                  <SpeakButton text={message.text} label={message.role === 'user' ? el.agent.you : el.agent.title} />
                </div>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-surface px-4 py-2">
              {el.agent.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="shrink-0 rounded-full bg-surface px-3 py-2 text-caption font-medium"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 p-3">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={el.agent.placeholder}
                aria-label={el.agent.placeholder}
                className="min-h-12 min-w-0 flex-1 rounded-full bg-surface px-4 outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label={el.agent.send}
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white disabled:opacity-40"
              >
                <Send className="size-5" strokeWidth={2} aria-hidden />
              </button>
            </form>
          </section>
        )}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? el.common.close : el.agent.open}
          className="pointer-events-auto flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg"
        >
          {open ? <X className="size-6" strokeWidth={2} aria-hidden /> : <MessageCircle className="size-6" strokeWidth={2} aria-hidden />}
        </button>
      </div>
    </div>
  )
}
