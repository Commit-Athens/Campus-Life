import { useState, type FormEvent } from 'react'
import { el } from '../i18n/el'
import type { UserPost } from '../types'
import { Button } from './Button'
import { Chip } from './Chip'
import { Sheet } from './Sheet'
import { TextInput } from './TextInput'

export type NewPost = Pick<UserPost, 'kind' | 'body' | 'title' | 'location' | 'tags'>

type Errors = { body?: string; title?: string; location?: string }

const kinds: UserPost['kind'][] = ['post', 'lost', 'found']

/** Form for a student post or a Lost & Found item. */
export function CreatePostSheet({ onSubmit, onClose }: { onSubmit: (post: NewPost) => void; onClose: () => void }) {
  const [kind, setKind] = useState<UserPost['kind']>('post')
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [tags, setTags] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const isLostFound = kind !== 'post'

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found: Errors = {}
    if (body.trim().length < 5) found.body = el.createPost.errors.body
    if (isLostFound && !title.trim()) found.title = el.createPost.errors.title
    if (isLostFound && !location.trim()) found.location = el.createPost.errors.location
    setErrors(found)
    if (Object.keys(found).length > 0) return

    onSubmit({
      kind,
      body: body.trim(),
      title: isLostFound ? title.trim() : undefined,
      location: isLostFound ? location.trim() : undefined,
      tags: isLostFound
        ? []
        : tags
            .split(',')
            .map((t) => t.trim().replace(/^#/, ''))
            .filter(Boolean)
            .slice(0, 3),
    })
    onClose()
  }

  const error = (id: string, text?: string) =>
    text && (
      <p id={id} className="px-4 text-caption text-error">
        {text}
      </p>
    )

  return (
    <Sheet title={el.createPost.title} onClose={onClose}>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-caption font-medium">{el.createPost.kindLabel}</span>
          <div className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <Chip key={k} label={el.createPost.kinds[k]} active={kind === k} onClick={() => setKind(k)} />
            ))}
          </div>
        </div>

        {isLostFound && (
          <>
            <div className="flex flex-col gap-1">
              <TextInput
                id="post-title"
                label={el.createPost.itemTitle}
                placeholder={el.createPost.itemTitlePlaceholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={80}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'post-title-error' : undefined}
              />
              {error('post-title-error', errors.title)}
            </div>
            <div className="flex flex-col gap-1">
              <TextInput
                id="post-location"
                label={el.createPost.location}
                placeholder={el.createPost.locationPlaceholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                maxLength={80}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? 'post-location-error' : undefined}
              />
              {error('post-location-error', errors.location)}
            </div>
          </>
        )}

        <label htmlFor="post-body" className="flex flex-col gap-1">
          <span className="text-caption font-medium">
            {isLostFound ? el.createPost.bodyLostFound : el.createPost.body}
          </span>
          <textarea
            id="post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            maxLength={500}
            aria-invalid={Boolean(errors.body)}
            aria-describedby={errors.body ? 'post-body-error' : undefined}
            className="rounded-2xl bg-surface px-4 py-3 text-body outline-none placeholder:text-muted focus:ring-2 focus:ring-primary"
          />
        </label>
        {error('post-body-error', errors.body)}

        {!isLostFound && (
          <TextInput
            id="post-tags"
            label={el.createPost.tags}
            placeholder={el.createPost.tagsPlaceholder}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            maxLength={80}
          />
        )}

        <Button type="submit">{el.createPost.submit}</Button>
      </form>
      <p className="text-caption text-muted">{el.createPost.notice}</p>
    </Sheet>
  )
}
