'use client'

import { PollWidget } from '@polypuls3/sdk/components'
import { ConnectButton } from '@/components/ConnectButton'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Polypuls3 SDK Demo</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Testing @polypuls3/sdk integration
            </p>
          </div>
          <ConnectButton />
        </div>

        <nav className="mt-6 flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Poll List
          </Link>
          <Link
            href="/features"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            v0.4.8 Features
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Example Poll</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This demonstrates the PollWidget component from the SDK. Connect your wallet to vote!
          </p>
        </div>

        {/* Example: Display poll #1 */}
        <PollWidget
          pollId={1n}
          onVoteSuccess={() => {
            console.log('Vote successful!')
            alert('Vote recorded successfully!')
          }}
          onVoteError={(error) => {
            console.error('Vote error:', error)
            alert(`Error voting: ${error.message}`)
          }}
        />

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">SDK Usage Example:</h3>
          <pre className="text-sm overflow-x-auto">
            {`<PollWidget
  pollId={1n}
  onVoteSuccess={() => alert('Vote successful!')}
  onVoteError={(error) => alert(error.message)}
/>`}
          </pre>
        </div>
      </main>
    </div>
  )
}
