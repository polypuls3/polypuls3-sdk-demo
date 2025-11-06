'use client'

import { PollWidget } from '@polypuls3/sdk/components'
import { ConnectButton } from '@/components/ConnectButton'
import Link from 'next/link'

export default function FeaturesDemo() {
  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">v0.4.8 Features Demo</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Display Modes, Success Banner & Confetti
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Features Demo
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">New in v0.4.8</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore the new customization options for poll widgets
          </p>
        </div>

        {/* Display Modes Section */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Display Modes</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Control how the poll widget displays voting and results interfaces
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Vote Mode */}
            <div>
              <h4 className="font-semibold mb-2">Vote Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Shows only voting interface, auto-switches to results after voting
              </p>
              <PollWidget
                pollId={1n}
                displayMode="vote"
                onVoteSuccess={() => console.log('Vote mode: Success!')}
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="vote"
/>`}
              </pre>
            </div>

            {/* Result Mode */}
            <div>
              <h4 className="font-semibold mb-2">Result Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Always shows results interface (no voting)
              </p>
              <PollWidget
                pollId={1n}
                displayMode="result"
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="result"
/>`}
              </pre>
            </div>

            {/* Mixed Mode */}
            <div>
              <h4 className="font-semibold mb-2">Mixed Mode (Default)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Auto-switches based on vote status
              </p>
              <PollWidget
                pollId={1n}
                displayMode="mixed"
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="mixed"
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Results Visibility Section */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Results Visibility Control</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hide results data while showing vote status
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Results Hidden */}
            <div>
              <h4 className="font-semibold mb-2">Results Hidden</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Shows "You've voted" message without revealing data
              </p>
              <PollWidget
                pollId={1n}
                displayMode="mixed"
                showResults={false}
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="mixed"
  showResults={false}
/>`}
              </pre>
            </div>

            {/* Custom Hidden Message */}
            <div>
              <h4 className="font-semibold mb-2">Custom Hidden Message</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Customize the message shown when results are hidden
              </p>
              <PollWidget
                pollId={1n}
                displayMode="result"
                showResults={false}
                resultsHiddenMessage="Results will be revealed after the poll closes!"
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="result"
  showResults={false}
  resultsHiddenMessage="..."
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Success Effects Section */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Vote Success Effects</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Celebrate successful votes with banners and confetti
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Success Banner */}
            <div>
              <h4 className="font-semibold mb-2">Success Banner</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Shows a slide-in banner with custom message
              </p>
              <PollWidget
                pollId={1n}
                displayMode="vote"
                successMessage="Your voice matters! Vote recorded."
                onVoteSuccess={() => console.log('Banner shown!')}
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="vote"
  successMessage="Your vote!"
/>`}
              </pre>
            </div>

            {/* Confetti Enabled */}
            <div>
              <h4 className="font-semibold mb-2">Confetti Celebration</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Trigger confetti animation on successful vote (premium theme only by default)
              </p>
              <PollWidget
                pollId={1n}
                displayMode="vote"
                enableConfetti={true}
                onVoteSuccess={() => console.log('Confetti triggered!')}
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="vote"
  enableConfetti={true}
/>`}
              </pre>
            </div>

            {/* Banner Disabled */}
            <div>
              <h4 className="font-semibold mb-2">No Success Banner</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Disable the success banner completely
              </p>
              <PollWidget
                pollId={1n}
                displayMode="vote"
                showSuccessBanner={false}
                onVoteSuccess={() => console.log('No banner shown')}
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="vote"
  showSuccessBanner={false}
/>`}
              </pre>
            </div>

            {/* Custom Duration */}
            <div>
              <h4 className="font-semibold mb-2">Custom Banner Duration</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Control how long the success banner stays visible
              </p>
              <PollWidget
                pollId={1n}
                displayMode="vote"
                successDuration={5000}
                successMessage="Banner stays for 5 seconds!"
                onVoteSuccess={() => console.log('5 second banner')}
              />
              <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`<PollWidget
  pollId={1n}
  successDuration={5000}
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Complete Example */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Complete Example</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            All features combined
          </p>

          <div className="max-w-2xl mx-auto">
            <PollWidget
              pollId={1n}
              displayMode="vote"
              showResults={true}
              successMessage="Thank you for participating!"
              successDuration={4000}
              enableConfetti={true}
              onVoteSuccess={() => {
                console.log('All features enabled!')
              }}
              onVoteError={(error) => {
                console.error('Vote error:', error)
              }}
            />

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Full Configuration:</h4>
              <pre className="text-sm overflow-x-auto">
{`<PollWidget
  pollId={1n}
  displayMode="vote"
  showResults={true}
  successMessage="Thank you for participating!"
  successDuration={4000}
  enableConfetti={true}
  onVoteSuccess={() => console.log('Success!')}
  onVoteError={(error) => console.error(error)}
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Behavior Table */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Display Mode Behavior Reference</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">displayMode</th>
                  <th className="px-4 py-2 text-left">showResults</th>
                  <th className="px-4 py-2 text-left">Before Vote</th>
                  <th className="px-4 py-2 text-left">After Vote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">vote</td>
                  <td className="px-4 py-2 font-mono text-sm">true</td>
                  <td className="px-4 py-2 text-sm">Voting UI</td>
                  <td className="px-4 py-2 text-sm">"You voted" + Results Data</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">vote</td>
                  <td className="px-4 py-2 font-mono text-sm">false</td>
                  <td className="px-4 py-2 text-sm">Voting UI</td>
                  <td className="px-4 py-2 text-sm">"You voted" (no data)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">result</td>
                  <td className="px-4 py-2 font-mono text-sm">true</td>
                  <td className="px-4 py-2 text-sm">Results Data</td>
                  <td className="px-4 py-2 text-sm">Results Data</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">result</td>
                  <td className="px-4 py-2 font-mono text-sm">false</td>
                  <td className="px-4 py-2 text-sm">"Results hidden"</td>
                  <td className="px-4 py-2 text-sm">"You voted" (no data)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">mixed</td>
                  <td className="px-4 py-2 font-mono text-sm">true</td>
                  <td className="px-4 py-2 text-sm">Voting UI</td>
                  <td className="px-4 py-2 text-sm">Results Data</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">mixed</td>
                  <td className="px-4 py-2 font-mono text-sm">false</td>
                  <td className="px-4 py-2 text-sm">Voting UI</td>
                  <td className="px-4 py-2 text-sm">"You voted" (no data)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
