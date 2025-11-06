'use client'

import { useState } from 'react'
import { MockPollWidget } from './MockPollWidget'

// Mock poll data for playground
const PLAYGROUND_POLL = {
  question: 'Which blockchain feature excites you most?',
  category: 'Technology',
  options: ['Smart Contracts', 'DeFi', 'NFTs', 'DAOs'],
  votes: [52, 38, 28, 19],
  status: 'active' as const,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
}

interface PlaygroundSettings {
  // Display & Visibility
  displayMode: 'vote' | 'result' | 'mixed'
  showResults: boolean
  resultsHiddenMessage: string

  // Chart Types & Styles
  chartType: 'bar' | 'pie' | 'infographic'
  barOrientation: 'horizontal' | 'vertical'
  infographicStyle: 'icons' | 'leaderboard' | 'cards'
  useCustomColors: boolean
  chartColors: string[]

  // Success Effects
  showSuccessBanner: boolean
  successMessage: string
  successDuration: number
  enableConfetti: boolean

  // Widget Settings
  size: 'small' | 'medium' | 'large'
}

const DEFAULT_SETTINGS: PlaygroundSettings = {
  displayMode: 'mixed',
  showResults: true,
  resultsHiddenMessage: '',
  chartType: 'bar',
  barOrientation: 'horizontal',
  infographicStyle: 'leaderboard',
  useCustomColors: false,
  chartColors: ['#8247e5', '#a78bfa', '#22c55e'],
  showSuccessBanner: true,
  successMessage: '',
  successDuration: 3000,
  enableConfetti: false,
  size: 'medium',
}

export function InteractivePlayground() {
  const [settings, setSettings] = useState<PlaygroundSettings>(DEFAULT_SETTINGS)
  const [showCode, setShowCode] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Update setting helper
  const updateSetting = <K extends keyof PlaygroundSettings>(
    key: K,
    value: PlaygroundSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  // Reset to defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  // Generate code for current configuration
  const generateCode = () => {
    const props: string[] = []

    // Only include non-default props
    if (settings.displayMode !== DEFAULT_SETTINGS.displayMode) {
      props.push(`displayMode="${settings.displayMode}"`)
    }
    if (settings.showResults !== DEFAULT_SETTINGS.showResults) {
      props.push(`showResults={${settings.showResults}}`)
    }
    if (settings.resultsHiddenMessage && !settings.showResults) {
      props.push(`resultsHiddenMessage="${settings.resultsHiddenMessage}"`)
    }
    if (settings.chartType !== DEFAULT_SETTINGS.chartType) {
      props.push(`chartType="${settings.chartType}"`)
    }
    if (settings.chartType === 'bar' && settings.barOrientation !== DEFAULT_SETTINGS.barOrientation) {
      props.push(`barOrientation="${settings.barOrientation}"`)
    }
    if (settings.chartType === 'infographic' && settings.infographicStyle !== DEFAULT_SETTINGS.infographicStyle) {
      props.push(`infographicStyle="${settings.infographicStyle}"`)
    }
    if (settings.useCustomColors) {
      props.push(`chartColors={${JSON.stringify(settings.chartColors)}}`)
    }
    if (settings.showSuccessBanner !== DEFAULT_SETTINGS.showSuccessBanner) {
      props.push(`showSuccessBanner={${settings.showSuccessBanner}}`)
    }
    if (settings.successMessage && settings.showSuccessBanner) {
      props.push(`successMessage="${settings.successMessage}"`)
    }
    if (settings.successDuration !== DEFAULT_SETTINGS.successDuration) {
      props.push(`successDuration={${settings.successDuration}}`)
    }
    if (settings.enableConfetti !== DEFAULT_SETTINGS.enableConfetti) {
      props.push(`enableConfetti={${settings.enableConfetti}}`)
    }
    if (settings.size !== DEFAULT_SETTINGS.size) {
      props.push(`size="${settings.size}"`)
    }

    if (props.length === 0) {
      return `<PollWidget pollId={1n} />`
    }

    return `<PollWidget\n  pollId={1n}\n  ${props.join('\n  ')}\n/>`
  }

  // Copy code to clipboard
  const copyCode = async () => {
    const code = generateCode()
    await navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Control Panel (Left) */}
      <aside className="w-full lg:w-80 space-y-4">
        {/* Display & Visibility Section */}
        <ControlSection title="Display & Visibility" icon="🖥️">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Display Mode</label>
              <div className="space-y-2">
                <RadioButton
                  checked={settings.displayMode === 'vote'}
                  onChange={() => updateSetting('displayMode', 'vote')}
                  label="Vote"
                  description="Show voting interface"
                />
                <RadioButton
                  checked={settings.displayMode === 'result'}
                  onChange={() => updateSetting('displayMode', 'result')}
                  label="Result"
                  description="Always show results"
                />
                <RadioButton
                  checked={settings.displayMode === 'mixed'}
                  onChange={() => updateSetting('displayMode', 'mixed')}
                  label="Mixed (Default)"
                  description="Auto-switch based on vote"
                />
              </div>
            </div>

            <ToggleSwitch
              checked={settings.showResults}
              onChange={(checked) => updateSetting('showResults', checked)}
              label="Show Results Data"
              description="Display actual vote counts and percentages"
            />

            {!settings.showResults && (
              <div>
                <label className="block text-sm font-medium mb-1">Hidden Results Message</label>
                <input
                  type="text"
                  value={settings.resultsHiddenMessage}
                  onChange={(e) => updateSetting('resultsHiddenMessage', e.target.value)}
                  placeholder="Custom message when results hidden"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            )}
          </div>
        </ControlSection>

        {/* Chart Types & Styles Section */}
        <ControlSection title="Chart Types & Styles" icon="📊">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Chart Type</label>
              <div className="space-y-2">
                <RadioButton
                  checked={settings.chartType === 'bar'}
                  onChange={() => updateSetting('chartType', 'bar')}
                  label="Bar Chart (Default)"
                />
                <RadioButton
                  checked={settings.chartType === 'pie'}
                  onChange={() => updateSetting('chartType', 'pie')}
                  label="Pie Chart"
                />
                <RadioButton
                  checked={settings.chartType === 'infographic'}
                  onChange={() => updateSetting('chartType', 'infographic')}
                  label="Infographic"
                />
              </div>
            </div>

            {settings.chartType === 'bar' && (
              <div>
                <label className="block text-sm font-medium mb-2">Bar Orientation</label>
                <div className="space-y-2">
                  <RadioButton
                    checked={settings.barOrientation === 'horizontal'}
                    onChange={() => updateSetting('barOrientation', 'horizontal')}
                    label="Horizontal (Default)"
                  />
                  <RadioButton
                    checked={settings.barOrientation === 'vertical'}
                    onChange={() => updateSetting('barOrientation', 'vertical')}
                    label="Vertical"
                  />
                </div>
              </div>
            )}

            {settings.chartType === 'infographic' && (
              <div>
                <label className="block text-sm font-medium mb-2">Infographic Style</label>
                <div className="space-y-2">
                  <RadioButton
                    checked={settings.infographicStyle === 'icons'}
                    onChange={() => updateSetting('infographicStyle', 'icons')}
                    label="Icons"
                  />
                  <RadioButton
                    checked={settings.infographicStyle === 'leaderboard'}
                    onChange={() => updateSetting('infographicStyle', 'leaderboard')}
                    label="Leaderboard (Default)"
                  />
                  <RadioButton
                    checked={settings.infographicStyle === 'cards'}
                    onChange={() => updateSetting('infographicStyle', 'cards')}
                    label="Cards"
                  />
                </div>
              </div>
            )}

            <ToggleSwitch
              checked={settings.useCustomColors}
              onChange={(checked) => updateSetting('useCustomColors', checked)}
              label="Use Custom Colors"
              description="Override default color palette"
            />
          </div>
        </ControlSection>

        {/* Success Effects Section */}
        <ControlSection title="Success Effects" icon="✨">
          <div className="space-y-3">
            <ToggleSwitch
              checked={settings.showSuccessBanner}
              onChange={(checked) => updateSetting('showSuccessBanner', checked)}
              label="Show Success Banner"
              description="Display banner after voting"
            />

            {settings.showSuccessBanner && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Success Message</label>
                  <input
                    type="text"
                    value={settings.successMessage}
                    onChange={(e) => updateSetting('successMessage', e.target.value)}
                    placeholder="Vote submitted successfully!"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Banner Duration: {settings.successDuration}ms
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="500"
                    value={settings.successDuration}
                    onChange={(e) => updateSetting('successDuration', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            )}

            <ToggleSwitch
              checked={settings.enableConfetti}
              onChange={(checked) => updateSetting('enableConfetti', checked)}
              label="Enable Confetti"
              description="Celebrate with confetti animation"
            />
          </div>
        </ControlSection>

        {/* Widget Settings Section */}
        <ControlSection title="Widget Settings" icon="⚙️">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Widget Size</label>
              <div className="space-y-2">
                <RadioButton
                  checked={settings.size === 'small'}
                  onChange={() => updateSetting('size', 'small')}
                  label="Small"
                />
                <RadioButton
                  checked={settings.size === 'medium'}
                  onChange={() => updateSetting('size', 'medium')}
                  label="Medium (Default)"
                />
                <RadioButton
                  checked={settings.size === 'large'}
                  onChange={() => updateSetting('size', 'large')}
                  label="Large"
                />
              </div>
            </div>

            <button
              onClick={resetSettings}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </ControlSection>
      </aside>

      {/* Preview Area (Right) */}
      <main className="flex-1 space-y-4">
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <MockPollWidget
            poll={PLAYGROUND_POLL}
            displayMode={settings.displayMode}
            showResults={settings.showResults}
            resultsHiddenMessage={settings.resultsHiddenMessage || undefined}
            size={settings.size}
            showSuccessBanner={settings.showSuccessBanner}
            successMessage={settings.successMessage || undefined}
            successDuration={settings.successDuration}
            enableConfetti={settings.enableConfetti}
          />
        </div>

        {/* Collapsible Code Preview */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm font-medium">
              {showCode ? 'Hide Code' : 'Show Code'}
            </span>
            <span className="text-gray-500">
              {showCode ? '▲' : '▼'}
            </span>
          </button>

          {showCode && (
            <div className="relative">
              <pre className="p-4 text-sm bg-gray-900 text-gray-100 overflow-x-auto">
                <code>{generateCode()}</code>
              </pre>
              <button
                onClick={copyCode}
                className="absolute top-2 right-2 px-3 py-1 text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                {copiedCode ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// Reusable Control Section Component
function ControlSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <span>{icon}</span>
        <span>{title}</span>
      </h3>
      {children}
    </div>
  )
}

// Reusable Radio Button Component
function RadioButton({
  checked,
  onChange,
  label,
  description
}: {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
}) {
  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 w-4 h-4 text-purple-600"
      />
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        {description && (
          <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
        )}
      </div>
    </label>
  )
}

// Reusable Toggle Switch Component
function ToggleSwitch({
  checked,
  onChange,
  label,
  description
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div className="relative inline-block w-10 h-6 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-purple-600 transition-colors"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        {description && (
          <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
        )}
      </div>
    </label>
  )
}
