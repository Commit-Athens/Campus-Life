import { announcements } from '../data/announcements'
import { benefits } from '../data/benefits'
import { sampleChat, chatChannels } from '../data/chat'
import { checklist } from '../data/checklist'
import { sampleComments } from '../data/comments'
import { exams } from '../data/exams'
import { forumPosts } from '../data/forum'
import { studyGroups } from '../data/groups'
import { housingListings } from '../data/housing'
import { lostFound } from '../data/lostFound'
import { courseNotes } from '../data/notes'
import { opportunities } from '../data/opportunities'
import { universitySources } from '../data/sources'
import { studentPosts } from '../data/studentPosts'
import { universities } from '../data/universities'
import { usefulLinks } from '../data/usefulLinks'
import { el } from '../i18n/el'
import type { University, UniversityScope } from '../types'

type Fact = {
  universityId: UniversityScope
  kind: string
  title: string
  text: string
}

const STOP = new Set([
  'και', 'το', 'τα', 'τη', 'τις', 'τον', 'την', 'του', 'της', 'των', 'οι', 'για', 'με', 'σε', 'στο', 'στη', 'στην',
  'στα', 'στις', 'στους', 'απο', 'τι', 'ποια', 'ποιο', 'ποιος', 'ποιες', 'πως', 'ειναι', 'εχει', 'μου', 'σου', 'να',
  'δεν', 'μια', 'ενα', 'ενας', 'που', 'θα', 'μην', 'ως', 'αυτο', 'αυτη', 'αυτα', 'κατι', 'κανε', 'πες', 'μου',
  'the', 'and', 'for', 'are', 'was', 'you', 'your', 'what', 'how', 'with', 'from', 'this', 'that', 'about',
])

/** English question words that should also match the Greek sample text. */
const EN_ALIASES: Record<string, string[]> = {
  announcement: ['ανακοινωσ'],
  announcements: ['ανακοινωσ'],
  meal: ['σιτισ', 'λεσχ'],
  meals: ['σιτισ', 'λεσχ'],
  food: ['σιτισ', 'φαγητ', 'λεσχ'],
  exam: ['εξετασ'],
  exams: ['εξετασ'],
  examination: ['εξετασ'],
  housing: ['στεγασ', 'συγκατοικ'],
  roommate: ['συγκατοικ'],
  benefit: ['προνομ'],
  benefits: ['προνομ'],
  group: ['ομαδ'],
  groups: ['ομαδ'],
  notes: ['σημειωσ'],
  checklist: ['πρωτοετ'],
  internship: ['πρακτικ'],
  hackathon: ['hackathon'],
}

function fold(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('el')
}

function tokens(value: string): string[] {
  const words = fold(value)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => word.length > 2 && !STOP.has(word))
  return [...words, ...words.flatMap((word) => EN_ALIASES[word] ?? [])]
}

function clip(value: string): string {
  const clean = value.replace(/\s+/g, ' ').trim()
  if (clean.length <= 180) return clean
  return `${clean.slice(0, 177).trimEnd()}…`
}

function commentsFor(itemId: string): string {
  return sampleComments
    .filter((comment) => comment.itemId === itemId)
    .map((comment) => `${comment.author}: ${comment.body}`)
    .join(' ')
}

function buildFacts(): Fact[] {
  const facts: Fact[] = []

  for (const uni of universities) {
    facts.push({
      universityId: uni.id,
      kind: el.agent.kinds.university,
      title: uni.name,
      text: `${uni.shortName}. ${el.agent.homepage}: ${uni.homepage}`,
    })
  }

  for (const item of announcements) {
    facts.push({
      universityId: item.universityId,
      kind: el.feed.filters[item.category],
      title: item.title,
      text: `${item.source}. ${item.body} ${commentsFor(item.id)}`,
    })
  }

  for (const item of studentPosts) {
    facts.push({
      universityId: item.universityId,
      kind: el.agent.kinds.post,
      title: item.author,
      text: `${item.department}. ${item.body} ${item.tags.join(' ')} ${commentsFor(item.id)}`,
    })
  }

  for (const item of lostFound) {
    facts.push({
      universityId: item.universityId,
      kind: item.kind === 'lost' ? el.feed.lost : el.feed.found,
      title: item.title,
      text: `${item.location}. ${item.body}`,
    })
  }

  for (const item of benefits) {
    facts.push({
      universityId: item.universityId,
      kind: el.agent.kinds.benefit,
      title: item.title,
      text: `${item.description} ${item.details}`,
    })
  }

  for (const item of usefulLinks) {
    facts.push({
      universityId: item.universityId,
      kind: el.agent.kinds.link,
      title: item.title,
      text: item.description,
    })
  }

  for (const item of checklist) {
    facts.push({
      universityId: item.universityId,
      kind: el.checklist.title,
      title: item.title,
      text: item.description,
    })
  }

  for (const item of exams) {
    facts.push({
      universityId: item.universityId,
      kind: el.exams.title,
      title: item.course,
      text: `${item.date} ${item.time}, ${item.location}`,
    })
  }

  for (const item of opportunities) {
    facts.push({
      universityId: item.universityId,
      kind: item.kind === 'internship' ? el.opportunities.internships : el.opportunities.hackathons,
      title: item.title,
      text: `${item.organizer}. ${item.location}. ${item.deadline}. ${item.description} ${item.details}`,
    })
  }

  for (const item of studyGroups) {
    facts.push({
      universityId: item.universityId,
      kind: el.agent.kinds.group,
      title: item.name,
      text: `${item.course}. ${el.groups.members(item.members)}. ${item.nextSession}`,
    })
  }

  for (const item of courseNotes) {
    facts.push({
      universityId: item.universityId,
      kind: el.notes.title,
      title: item.title,
      text: `${item.course}. ${el.notes.meta(item.pages)}`,
    })
  }

  for (const item of housingListings) {
    facts.push({
      universityId: item.universityId,
      kind: item.kind === 'room' ? el.housing.room : el.housing.roommate,
      title: item.title,
      text: `${item.area}. ${item.rent}. ${item.description}`,
    })
  }

  for (const item of forumPosts) {
    const replies = item.replies.map((reply) => `${reply.alias}: ${reply.body}`).join(' ')
    facts.push({
      universityId: item.universityId,
      kind: el.forum.categories[item.category],
      title: item.title,
      text: `${item.alias}. ${item.body} ${replies}`,
    })
  }

  for (const uni of universities) {
    for (const channel of chatChannels) {
      for (const message of sampleChat(uni.id, channel)) {
        facts.push({
          universityId: uni.id,
          kind: el.chat.channels[channel],
          title: message.author,
          text: message.body,
        })
      }
    }
  }

  for (const source of universitySources) {
    const uni = universities.find((item) => item.id === source.universityId)
    facts.push({
      universityId: source.universityId,
      kind: el.sources.title,
      title: uni?.shortName ?? source.universityId,
      text: source.blurb,
    })
  }

  return facts
}

function score(fact: Fact, words: string[]): number {
  const title = fold(fact.title)
  const text = fold(`${fact.kind} ${fact.text}`)
  let total = 0
  for (const word of words) {
    if (title.includes(word)) total += 3
    else if (text.includes(word)) total += 1
  }
  return total
}

/** Answer from the sample content for this university. No network call. */
export function askCampus(question: string, university: University): string {
  const words = tokens(question)
  if (words.length === 0) return el.agent.hint(university.shortName)

  const ranked = buildFacts()
    .filter((fact) => fact.universityId === university.id || fact.universityId === 'all')
    .map((fact) => ({ fact, score: score(fact, words) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  if (ranked.length === 0) return el.agent.empty(university.shortName)

  const lines = ranked.map(({ fact }) => `• ${fact.title} (${fact.kind}). ${clip(fact.text)}`)
  return `${el.agent.found(university.shortName)}\n\n${lines.join('\n\n')}`
}
