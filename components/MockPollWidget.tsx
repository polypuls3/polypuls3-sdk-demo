'use client'

import { useState, useRef } from 'react'
import clsx from 'clsx'
import { celebrateVote } from '@polypuls3/sdk/core'
import { MockPollResults } from './MockPollResults'

// Mock poll data type
interface MockPoll {
  question: string
  category?: string
  options: string[]
  votes: number[]
  status: 'active' | 'ended' | 'not_started'
  expiresAt: Date
  createdAt: Date
}

// Mock poll widget props matching SDK PollWidget
export interface MockPollWidgetProps {
  poll: MockPoll
  className?: string
  onVoteSuccess?: () => void
  onVoteError?: (error: Error) => void
  showResults?: boolean
  size?: 'small' | 'medium' | 'large'
  displayMode?: 'vote' | 'result' | 'mixed'
  resultsHiddenMessage?: string
  showSuccessBanner?: boolean
  successMessage?: string
  successDuration?: number
  enableConfetti?: boolean
}

/**
 * MockPollWidget - Demo-only component that simulates PollWidget behavior
 * without requiring blockchain data or wallet connection
 */
export function MockPollWidget({
  poll,
  className,
  onVoteSuccess,
  onVoteError,
  showResults = true,
  size = 'medium',
  displayMode = 'mixed',
  resultsHiddenMessage,
  showSuccessBanner = true,
  successMessage,
  successDuration = 3000,
  enableConfetti = false,
}: MockPollWidgetProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<number | undefined>()
  const [showSuccess, setShowSuccess] = useState(false)
  const [mockVotes, setMockVotes] = useState(poll.votes)

  // Canvas ref for constrained confetti
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  // Calculate status based on timestamps
  const getStatus = () => {
    const now = new Date()
    if (poll.status === 'ended' || now > poll.expiresAt) {
      return 'ended'
    }
    if (now < poll.createdAt) {
      return 'not_started'
    }
    return 'active'
  }

  const status = getStatus()

  // Determine which interface to display
  const getDisplayInterface = (): 'vote' | 'result' => {
    if (displayMode === 'vote') {
      if (hasVoted || status === 'ended') {
        return 'result'
      }
      return 'vote'
    }

    if (displayMode === 'result') {
      return 'result'
    }

    // mixed mode
    if (hasVoted || status === 'ended') {
      return 'result'
    }
    return 'vote'
  }

  const displayInterface = getDisplayInterface()
  const showActualResults = showResults && displayInterface === 'result'

  // Handle mock vote
  const handleVote = (optionIndex: number) => {
    if (status !== 'active' || hasVoted) return

    // Simulate vote
    setUserVote(optionIndex)
    setHasVoted(true)

    // Update vote counts
    const newVotes = [...mockVotes]
    newVotes[optionIndex] += 1
    setMockVotes(newVotes)

    // Show success banner
    if (showSuccessBanner) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, successDuration)
    }

    // Trigger confetti if enabled
    if (enableConfetti) {
      celebrateVote(undefined, confettiCanvasRef.current)
    }

    onVoteSuccess?.()
  }

  // Format time remaining
  const getTimeRemaining = () => {
    const now = new Date()
    const diff = Math.floor((poll.expiresAt.getTime() - now.getTime()) / 1000)

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, isExpired: true }
    }

    return {
      days: Math.floor(diff / 86400),
      hours: Math.floor((diff % 86400) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      isExpired: false,
    }
  }

  const timeRemaining = getTimeRemaining()

  return (
    <div className={`pp-size-${size}`}>
      <div className={clsx('polypuls3-card', 'pp-confetti-container', className)}>
        {/* Confetti Canvas */}
        <canvas
          ref={confettiCanvasRef}
          className="pp-confetti-canvas"
          aria-hidden="true"
        />

        {/* Success Banner */}
        {showSuccess && (
          <div className="pp-success-banner pp-animate-slide-in">
            <svg className="pp-success-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="pp-widget-body">
              {successMessage ?? 'Vote submitted successfully!'}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="pp-mb-4">
          <div className="pp-flex pp-items-start pp-justify-between pp-mb-2">
            <h2 className="pp-widget-title pp-text-foreground">{poll.question}</h2>
            <span
              className={clsx(
                'pp-status-badge pp-rounded-full pp-font-medium',
                status === 'active' && 'pp-bg-success/10 pp-text-success',
                status === 'ended' && 'pp-bg-muted pp-text-muted-foreground',
                status === 'not_started' && 'pp-bg-secondary/10 pp-text-secondary'
              )}
            >
              {status === 'active' && 'Active'}
              {status === 'ended' && 'Ended'}
              {status === 'not_started' && 'Not Started'}
            </span>
          </div>

          {poll.category && (
            <p className="pp-widget-body pp-text-foreground pp-mb-3">
              Category: {poll.category}
            </p>
          )}

          {/* Time info */}
          <div className="pp-widget-body pp-text-muted-foreground">
            {status === 'active' && !timeRemaining.isExpired && (
              <p>
                Ends in {timeRemaining.days > 0 && `${timeRemaining.days}d `}
                {timeRemaining.hours}h {timeRemaining.minutes}m
              </p>
            )}
            {status === 'ended' && <p>Poll has ended</p>}
            {status === 'not_started' && <p>Poll not started yet</p>}
          </div>
        </div>

        {/* Results or Voting Interface */}
        {displayInterface === 'result' ? (
          <div className="pp-widget-spacing">
            <h3 className="pp-widget-heading">Results</h3>

            {hasVoted && userVote !== undefined && (
              <p className="pp-widget-body pp-text-success pp-mb-3">
                You voted for option {userVote + 1}
              </p>
            )}

            {showActualResults ? (
              // Show actual results with vote counts and percentages
              <MockPollResults options={poll.options} votes={mockVotes} />
            ) : (
              // Show message without revealing results data
              <div className="pp-p-4 pp-bg-muted/50 pp-rounded-polypuls3 pp-text-center">
                <p className="pp-widget-body pp-text-muted-foreground">
                  {resultsHiddenMessage ??
                    (hasVoted
                      ? 'Thank you for voting! Results are hidden for this poll.'
                      : status === 'ended'
                        ? 'This poll has ended. Results are not publicly available.'
                        : 'Results will be available after you vote.')}
                </p>
              </div>
            )}
          </div>
        ) : (
          // Vote interface
          <div className="pp-widget-spacing">
            <h3 className="pp-widget-heading">Cast your vote</h3>
            <div className="pp-widget-spacing">
              {poll.options.map((option, index) => (
                <div
                  key={index}
                  className="pp-vote-option pp-flex pp-items-center pp-justify-between pp-border pp-border-border pp-rounded-polypuls3 hover:pp-border-primary pp-transition-colors"
                >
                  <span className="pp-vote-option-text pp-text-foreground">{option}</span>
                  <button
                    onClick={() => handleVote(index)}
                    disabled={status !== 'active' || hasVoted}
                    className="polypuls3-button polypuls3-button-primary"
                  >
                    Vote
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
