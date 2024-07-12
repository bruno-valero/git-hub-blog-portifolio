import 'katex/dist/katex.min.css'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { Link } from '@/components/link'
import { Checkbox } from '@/components/ui/checkbox'

import { ButtonCopyToClipboard } from './button-copy-to-clipboard'

interface MarkdownContentProps {
  data: string
}

export function MarkdownContent({ data }: MarkdownContentProps) {
  return (
    <div className="mb-[6rem] w-full p-10">
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ href, children, ...props }) => (
            <span className="flex items-start justify-start">
              <Link
                {...props}
                href={href ?? ''}
                target="_blank"
                className="mt-1 pb-1 text-14 leading-[.5rem] text-base-text"
              >
                {children}
              </Link>
            </span>
          ),
          p: (props) => (
            <p
              {...props}
              className="my-1 flex items-center justify-start gap-2 text-14 text-base-text"
            />
          ),
          ul: (props) => (
            <ul
              {...props}
              className="my-6 ml-6 list-disc text-14 text-base-text"
            />
          ),
          li: ({ children, ...props }) => (
            <li {...props} className="text-14 text-base-text">
              <div className="flex items-center justify-start gap-2">
                {children}
              </div>
            </li>
          ),
          h1: (props) => (
            <h1
              {...props}
              className="my-4 border-b-[1px] border-base-span/60 py-1 text-24 font-bold tracking-wide text-base-title"
            />
          ),
          h2: (props) => (
            <h2
              {...props}
              className="my-4 border-b-[1px] border-base-span/40 py-1 text-20 font-semibold tracking-wide text-base-title"
            />
          ),
          h3: (props) => (
            <h3
              {...props}
              className="my-4 py-1 text-18 font-semibold tracking-wide text-base-title"
            />
          ),
          input: ({ type, ...props }) =>
            type === 'checkbox' ? (
              <Checkbox
                checked={props.checked}
                className="cursor-default bg-base-post text-14 text-base-text data-[state=checked]:bg-blue/70"
              />
            ) : (
              <input
                {...props}
                type={type}
                className="text-14 text-base-text"
              />
            ),
          code(props) {
            const { children, className, node, ref, ...rest } = props
            node?.type // eslint-disable-line
            ref?.toString()

            const match = /language-(\w+)/.exec(className || '')
            return (
              <>
                {match ? (
                  <div className="relative my-4">
                    <ButtonCopyToClipboard data={String(children)} />
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      language={match[1]}
                      customStyle={{
                        background: '#112131',
                        textShadow: 'none',
                        borderRadius: 2,
                        padding: '1rem',
                        lineHeight: '160%',
                      }}
                      style={darcula}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )}
              </>
            )
          },
        }}
      >
        {data}
      </ReactMarkdown>
    </div>
  )
}
