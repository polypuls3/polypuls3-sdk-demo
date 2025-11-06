'use client'

import clsx from 'clsx'

export interface MockPollResultsProps {
  options: string[]
  votes: number[]
  className?: string
  showVoteCount?: boolean
  showPercentage?: boolean
}

/**
 * MockPollResults - Demo-only component that displays poll results
 * Matches the styling of the real PollResults component
 */
export function MockPollResults({
  options,
  votes,
  className,
  showVoteCount = true,
  showPercentage = true,
}: MockPollResultsProps) {
  // Calculate total votes
  const totalVotes = votes.reduce((sum, count) => sum + count, 0)

  // Calculate percentages and find leader
  const results = options.map((option, index) => {
    const voteCount = votes[index]
    const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0

    return {
      option,
      voteCount,
      percentage,
    }
  })

  // Find the leading option(s)
  const maxVotes = Math.max(...votes)
  const leaders = results.map((r) => r.voteCount === maxVotes && maxVotes > 0)

  return (
    <div className={clsx('pp-space-y-4', className)}>
      {/* Results list */}
      <div className="pp-space-y-3">
        {results.map((result, index) => {
          const isLeader = leaders[index]

          return (
            <div key={index} className="pp-space-y-1">
              {/* Option header */}
              <div className="pp-flex pp-items-center pp-justify-between">
                <div className="pp-flex pp-items-center pp-gap-2">
                  <span className="pp-text-sm pp-font-medium pp-text-foreground">
                    {result.option}
                  </span>
                  {isLeader && (
                    <span className="pp-text-sm" title="Leading option">
                      👑
                    </span>
                  )}
                </div>

                <div className="pp-flex pp-items-center pp-gap-2 pp-text-sm">
                  {showVoteCount && (
                    <span className="pp-text-muted-foreground">
                      {result.voteCount} {result.voteCount === 1 ? 'vote' : 'votes'}
                    </span>
                  )}
                  {showPercentage && (
                    <span className="pp-font-medium pp-text-foreground">
                      {result.percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="pp-relative pp-h-3 pp-bg-muted pp-rounded-full pp-overflow-hidden">
                <div
                  className={clsx(
                    'pp-progress-bar pp-h-full pp-rounded-full pp-transition-all pp-duration-300',
                    isLeader ? 'pp-progress-bar-leader' : ''
                  )}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Total votes */}
      <div className="pp-pt-2 pp-border-t pp-border-border">
        <p className="pp-text-sm pp-text-muted-foreground">
          Total votes: <span className="pp-font-medium pp-text-foreground">{totalVotes}</span>
        </p>
      </div>
    </div>
  )
}
