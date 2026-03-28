import type { BannerData } from '@/lib/data'

export default function Banner({ statusEnabled, status, warningEnabled, warning }: BannerData) {
  const showStatus = statusEnabled && status
  const showWarning = warningEnabled && warning

  if (!showStatus && !showWarning) return null

  return (
    <div className="kk-messages">
      {showWarning && (
        <div className="kk-warning container text-center">
          <div dangerouslySetInnerHTML={{ __html: warning }} />
        </div>
      )}
      {showStatus && (
        <div className="kk-status container text-center">
          <div dangerouslySetInnerHTML={{ __html: status }} />
        </div>
      )}
    </div>
  )
}
