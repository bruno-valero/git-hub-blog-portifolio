import {
  faCircleXmark,
  faCode,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'

import { Footer } from '../footer'
import { ChangeSectionButton } from './change-section-button'
import { Feed, FeedData } from './feed'
import { Profile } from './profile'

export function Home() {
  const data: FeedData = [
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
    {
      title: 'JavaScript data types and data structures',
      href: '/',
      description:
        'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
      date: dayjs()
        .subtract(Math.round(Math.random() * 10) || 1, 'day')
        .toDate(),
    },
  ]
  return (
    <div className="flex w-full max-w-[100vw] flex-col items-center justify-start">
      <div className="w-full max-w-[56rem]">
        <Profile />
        <div className="my-10 flex w-full items-center justify-center gap-6">
          <ChangeSectionButton
            active
            href="/"
            icon={faPlay}
            text="em produção"
          />
          <ChangeSectionButton href="/" icon={faCode} text="repositórios" />
          <ChangeSectionButton href="/" icon={faCircleXmark} text="issues" />
        </div>
        <Feed data={data} />
      </div>
      <Footer />
    </div>
  )
}
