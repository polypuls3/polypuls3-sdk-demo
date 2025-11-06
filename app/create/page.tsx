'use client'

import { CreatePollForm } from '@polypuls3/sdk/components'
import { ConnectButton } from '@/components/ConnectButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Create Poll</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a new poll using the SDK
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Features Demo
          </Link>
          <Link
            href="/playground"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Playground
          </Link>
        </nav>
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Create New Poll</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Connect your wallet and fill out the form to create a new poll on Polygon Amoy.
          </p>
        </div>

        <CreatePollForm
          onSuccess={(pollId) => {
            console.log('Poll created:', pollId)
            alert(`Poll created successfully! Poll ID: ${pollId}`)
            router.push('/')
          }}
          onError={(error) => {
            console.error('Create poll error:', error)
            alert(`Error creating poll: ${error.message}`)
          }}
        />

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">SDK Usage Example:</h3>
          <pre className="text-sm overflow-x-auto">
            {`<CreatePollForm
  onSuccess={(pollId) => {
    console.log('Poll ID:', pollId)
    // Navigate to poll or show success
  }}
  onError={(error) => {
    console.error(error.message)
  }}
/>`}
          </pre>
        </div>
      </main>
    </div>
  )
}
