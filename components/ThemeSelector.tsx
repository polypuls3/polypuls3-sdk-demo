'use client'

import { useState, useEffect } from 'react'
import type { ThemePreset } from '@polypuls3/sdk'

export function ThemeSelector() {
  const [theme, setTheme] = useState<ThemePreset>('minimal')

  useEffect(() => {
    // Get initial value from window context
    const context = (window as any).__polypuls3Theme
    if (context) {
      setTheme(context.theme)
    }
  }, [])

  const handleChange = (newTheme: ThemePreset) => {
    setTheme(newTheme)
    const context = (window as any).__polypuls3Theme
    if (context?.setTheme) {
      context.setTheme(newTheme)
      // React will handle the update automatically
    }
  }

  const themes: Record<ThemePreset, { label: string; description: string; color: string }> = {
    minimal: {
      label: 'Minimal',
      description: 'Clean, flat design',
      color: 'bg-gray-600',
    },
    premium: {
      label: 'Premium',
      description: 'Gradients & effects',
      color: 'bg-purple-600',
    },
    custom: {
      label: 'Custom',
      description: 'Custom theme',
      color: 'bg-blue-600',
    },
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Visual Theme:</span>
        <span className={`px-2 py-1 text-xs text-white rounded ${themes[theme]?.color || themes.minimal.color}`}>
          {themes[theme]?.label || 'Minimal'}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleChange('minimal')}
          className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
            theme === 'minimal'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="font-medium">Minimal</div>
          <div className="text-xs opacity-75">Clean & flat</div>
        </button>
        <button
          onClick={() => handleChange('premium')}
          className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
            theme === 'premium'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="font-medium">Premium</div>
          <div className="text-xs opacity-75">Gradients & effects</div>
        </button>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400">
        {theme === 'minimal' && 'Flat colors, subtle shadows, simple interactions'}
        {theme === 'premium' && 'Gradient fills, layered shadows, smooth animations'}
      </p>
    </div>
  )
}
