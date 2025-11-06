'use client'

import { useState, useEffect } from 'react'
import type { WidgetSize } from '@polypuls3/sdk'

export function SizeSelector() {
  const [size, setSize] = useState<WidgetSize>('medium')

  useEffect(() => {
    // Get initial value from window context
    const context = (window as any).__polypuls3Size
    if (context) {
      setSize(context.size)
    }
  }, [])

  const handleChange = (newSize: WidgetSize) => {
    setSize(newSize)
    const context = (window as any).__polypuls3Size
    if (context?.setSize) {
      context.setSize(newSize)
      // React will handle the update automatically
    }
  }

  const sizes: Record<WidgetSize, { label: string; description: string; color: string }> = {
    small: {
      label: 'Small',
      description: 'Compact widgets',
      color: 'bg-blue-600',
    },
    medium: {
      label: 'Medium',
      description: 'Default size',
      color: 'bg-green-600',
    },
    large: {
      label: 'Large',
      description: 'Spacious widgets',
      color: 'bg-orange-600',
    },
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Widget Size:</span>
        <span className={`px-2 py-1 text-xs text-white rounded ${sizes[size]?.color || sizes.medium.color}`}>
          {sizes[size]?.label || 'Medium'}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleChange('small')}
          className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
            size === 'small'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="font-medium">Small</div>
          <div className="text-xs opacity-75">Compact</div>
        </button>
        <button
          onClick={() => handleChange('medium')}
          className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
            size === 'medium'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="font-medium">Medium</div>
          <div className="text-xs opacity-75">Default</div>
        </button>
        <button
          onClick={() => handleChange('large')}
          className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
            size === 'large'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="font-medium">Large</div>
          <div className="text-xs opacity-75">Spacious</div>
        </button>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400">
        {size === 'small' && 'Smaller text and compact spacing for dense layouts'}
        {size === 'medium' && 'Balanced size for most use cases (default)'}
        {size === 'large' && 'Larger text and generous spacing for emphasis'}
      </p>
    </div>
  )
}
