'use client'

import { InteractivePlayground } from '@/components/InteractivePlayground'
import { ConnectButton } from '@/components/ConnectButton'
import Link from 'next/link'

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Interactive Playground</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Experiment with all widget settings in real-time
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Playground
          </Link>
        </nav>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            📝 <strong>Note:</strong> This playground uses mock data to demonstrate widget features.
            Use the controls on the left to customize the poll widget and see changes instantly.
            The code preview shows the exact props needed for your configuration.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-lg border-2 border-purple-200 dark:border-purple-800">
          <InteractivePlayground />
        </div>
      </main>
    </div>
  )
}
