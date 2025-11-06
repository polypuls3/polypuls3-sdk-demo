'use client'

import clsx from 'clsx'
import { PollResultsBar } from '@polypuls3/sdk/components'
import { PollResultsPie } from '@polypuls3/sdk/components'
import { PollResultsInfographic } from '@polypuls3/sdk/components'

export interface MockPollResultsProps {
  options: string[]
  votes: number[]
  className?: string
  showVoteCount?: boolean
  showPercentage?: boolean
  chartType?: 'bar' | 'pie' | 'infographic'
  barOrientation?: 'horizontal' | 'vertical'
  infographicStyle?: 'icons' | 'leaderboard' | 'cards'
  chartColors?: string[]
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
  chartType = 'bar',
  barOrientation = 'horizontal',
  infographicStyle = 'leaderboard',
  chartColors,
}: MockPollResultsProps) {
  // Calculate total votes
  const totalVotes = votes.reduce((sum, count) => sum + count, 0)

  // Calculate percentages and find leader
  const results = options.map((option, index) => {
    const voteCount = votes[index]
    const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0

    return {
      id: index.toString(),
      text: option,
      voteCount: BigInt(voteCount),
      percentage,
    }
  })

  // Find the leading option
  const maxVotes = Math.max(...votes)
  const leadingOptionId = results.find((r) => Number(r.voteCount) === maxVotes)?.id || null

  // Route to appropriate chart component based on chartType
  if (chartType === 'pie') {
    return (
      <PollResultsPie
        results={results}
        totalVotes={BigInt(totalVotes)}
        leadingOptionId={leadingOptionId}
        colors={chartColors}
        isPremium={false}
      />
    )
  }

  if (chartType === 'infographic') {
    return (
      <PollResultsInfographic
        results={results}
        totalVotes={BigInt(totalVotes)}
        leadingOptionId={leadingOptionId}
        style={infographicStyle}
        isPremium={false}
      />
    )
  }

  // Default: bar chart
  return (
    <PollResultsBar
      results={results}
      totalVotes={BigInt(totalVotes)}
      leadingOptionId={leadingOptionId}
      showVoteCount={showVoteCount}
      showPercentage={showPercentage}
      orientation={barOrientation}
      isPremium={false}
    />
  )
}
