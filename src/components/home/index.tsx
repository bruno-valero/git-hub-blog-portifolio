import {
  faCircleXmark,
  faCode,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'

import { Issues } from '@/api/github/classes/issues'
import { Repos } from '@/api/github/classes/repos'
import { ServerProps } from '@/app/page'

import { Footer } from '../footer'
import { ChangeSectionButton } from './change-section-button'
import { Feed, FeedData } from './feed'
import { Profile } from './profile'

interface HomeProps {
  serverProps: ServerProps
}

export async function Home(props: HomeProps) {
  // const data: FeedData = [
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  //   {
  //     title: 'JavaScript data types and data structures',
  //     href: '/',
  //     description:
  //       'Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in ',
  //     date: dayjs()
  //       .subtract(Math.round(Math.random() * 10) || 1, 'day')
  //       .toDate(),
  //   },
  // ]

  type HomeSectionSearchParam = 'production' | 'repos' | 'issues'

  const homeSection = props.serverProps.searchParams.homeSection as
    | HomeSectionSearchParam
    | undefined

  async function getData(section: HomeSectionSearchParam) {
    const user = 'bruno-valero'
    if (section === 'repos' || section === 'issues') {
      const repos = await Repos.get({ user: `${user}` })
      const data: FeedData = repos.map((item) => {
        return {
          date: new Date(item.data.created_at),
          description: item.data.description ?? 'Não há descrição',
          title: item.name,
          href: `/repo?name=${item.data.name}&user=${user}`,
        }
      })

      if (section === 'repos') return data

      const reposWithIssues = repos.filter((item) => item.data.open_issues > 0)

      const issuesArray = await Promise.all(
        reposWithIssues.map(async (item) => {
          const issues = await Issues.get({
            user: `${user}`,
            repository: item.data.name,
          })

          return issues
        }),
      )

      const issues = issuesArray.reduce((acc, item) => {
        return [...acc, ...item]
      }, [])

      const issuesData: FeedData = issues.map((item) => {
        const repo = item.data.url.split(user)[1].split('/')[1]
        const issueId = item.data.url.split(user)[1].split('/')[3]
        return {
          date: new Date(item.data.created_at),
          description: item.data.body.slice(0, 80).concat(' ...'),
          title: item.data.title,
          href: `/issue?user=${user}&repo=${repo}&issueId=${issueId}`,
        }
      })

      return issuesData
    } else {
      const data: FeedData = [
        {
          date: new Date(2024, 6, 10),
          href: 'https://habits.brunovalero.com.br',
          title: 'Gerenciador de Hábitos',
          description: 'Gerencie seus hábitos com o site "Habits".',
          newWindow: true,
        },
      ]

      return data
    }
  }

  const data = (await getData(homeSection ?? 'production')).sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  )

  return (
    <div className="flex w-full max-w-[100vw] flex-col items-center justify-start">
      <div className="w-full max-w-[56rem]">
        <Profile />
        <div className="my-10 flex w-full items-center justify-center gap-6">
          <ChangeSectionButton
            active={!homeSection || homeSection === 'production'}
            href="?homeSection=production"
            icon={faPlay}
            text="em produção"
          />
          <ChangeSectionButton
            active={homeSection === 'repos'}
            href="?homeSection=repos"
            icon={faCode}
            text="repositórios"
          />
          <ChangeSectionButton
            active={homeSection === 'issues'}
            href="?homeSection=issues"
            icon={faCircleXmark}
            text="issues"
          />
        </div>
        <Feed data={data} />
      </div>
      <Footer />
    </div>
  )
}
