import { marked } from 'marked'

interface BannerProps {
  status: string | null
  warning: string | null
}

function renderMarkdown(md: string): string {
  // marked.parse returns a block-level result wrapped in <p>; use parseInline for single-line
  return marked.parse(md) as string
}

export default function Banner({ status, warning }: BannerProps) {
  if (!status && !warning) return null

  return (
    <div className="kk-messages">
      {warning && (
        <div className="kk-warning container text-center">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(warning) }} />
        </div>
      )}
      {status && (
        <div className="kk-status container text-center">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(status) }} />
        </div>
      )}
    </div>
  )
}
