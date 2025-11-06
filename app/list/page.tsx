'use client'

import { usePollsList, PollCard } from '@polypuls3/sdk'
import { ConnectButton } from '@/components/ConnectButton'
import { DataSourceToggle } from '@/components/DataSourceToggle'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ListPage() {
  const router = useRouter()
  const { polls, isLoading, error, activeSource } = usePollsList({
    limit: 20,
    offset: 0,
  })

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Poll List</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Browse all polls from the subgraph
            </p>
          </div>
          <ConnectButton />
        </div>

        <nav className="mt-6 flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            View Poll
          </Link>
          <Link
            href="/create"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Create Poll
          </Link>
          <Link
            href="/list"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Poll List
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Active Polls</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Click on any poll to view details and vote.
              </p>
              {activeSource && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Loading from: <span className="font-semibold">{activeSource}</span>
                </p>
              )}
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <DataSourceToggle />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading polls...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-600 dark:text-red-400">Error loading polls: {error.message}</p>
          </div>
        )}

        {!isLoading && !error && polls && polls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No polls found.</p>
          </div>
        )}

        {!isLoading && !error && polls && polls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {polls.map((poll) => (
              <PollCard
                key={poll.id.toString()}
                poll={poll}
                onClick={() => router.push(`/?poll=${poll.id}`)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">SDK Usage Example:</h3>
          <pre className="text-sm overflow-x-auto">
            {`// Unified hook that respects data source configuration
const { polls, isLoading, error, activeSource } = usePollsList({
  limit: 20,
  offset: 0,
})

// Or override the global setting
const { polls } = usePollsList({
  limit: 20,
  dataSource: 'subgraph' // 'contract', 'subgraph', or 'auto'
})

{polls?.map((poll) => (
  <PollCard
    key={poll.id}
    poll={poll}
    onClick={() => viewPoll(poll.id)}
  />
))}`}
          </pre>
        </div>
      </main>
    </div>
  )
}
