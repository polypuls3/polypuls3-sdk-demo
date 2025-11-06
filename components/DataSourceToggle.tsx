'use client'

import { useState, useEffect } from 'react'
import type { DataSource } from '@polypuls3/sdk'

export function DataSourceToggle() {
  const [dataSource, setDataSource] = useState<DataSource>('auto')

  useEffect(() => {
    // Get initial value from window
    const context = (window as any).__polypuls3DataSource
    if (context) {
      setDataSource(context.dataSource)
    }
  }, [])

  const handleChange = (source: DataSource) => {
    setDataSource(source)
    const context = (window as any).__polypuls3DataSource
    if (context?.setDataSource) {
      context.setDataSource(source)
      // Reload to apply new setting
      window.location.reload()
    }
  }

  const badges = {
    contract: { label: 'Contract', color: 'bg-blue-600' },
    subgraph: { label: 'Subgraph', color: 'bg-green-600' },
    auto: { label: 'Auto', color: 'bg-purple-600' },
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Data Source:</span>
        <span className={`px-2 py-1 text-xs text-white rounded ${badges[dataSource].color}`}>
          {badges[dataSource].label}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleChange('contract')}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            dataSource === 'contract'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Contract
        </button>
        <button
          onClick={() => handleChange('subgraph')}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            dataSource === 'subgraph'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Subgraph
        </button>
        <button
          onClick={() => handleChange('auto')}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            dataSource === 'auto'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Auto
        </button>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400">
        {dataSource === 'contract' && 'Always fetch from blockchain contract (most authoritative)'}
        {dataSource === 'subgraph' && 'Always fetch from The Graph subgraph (faster for lists)'}
        {dataSource === 'auto' && 'Try subgraph first, fallback to contract if needed'}
      </p>
    </div>
  )
}
