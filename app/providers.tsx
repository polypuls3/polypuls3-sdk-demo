'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, walletConnect } from 'wagmi/connectors'
import { ReactNode, useState, useEffect } from 'react'
import { PolyPulseProvider, type DataSource, type ThemePreset, type WidgetSize } from '@polypuls3/sdk'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!

// Configure wagmi
const config = createConfig({
  chains: [polygonAmoy, polygon],
  connectors: [
    injected(),
    walletConnect({
      projectId,
      metadata: {
        name: 'Polypuls3 SDK Demo',
        description: 'Demo app for @polypuls3/sdk',
        url: 'https://polypuls3.com',
        icons: ['https://polypuls3.com/icon.png'],
      },
    }),
  ],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
})

// Create QueryClient
const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  // Initialize with default values (no localStorage check to avoid hydration mismatch)
  const [dataSource, setDataSource] = useState<DataSource>('auto')
  const [theme, setTheme] = useState<ThemePreset>('minimal')
  const [size, setSize] = useState<WidgetSize>('medium')

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    const storedDataSource = localStorage.getItem('polypuls3-data-source') as DataSource
    const storedTheme = localStorage.getItem('polypuls3-theme') as ThemePreset
    const storedSize = localStorage.getItem('polypuls3-size') as WidgetSize

    if (storedDataSource) {
      setDataSource(storedDataSource)
    }
    if (storedTheme) {
      setTheme(storedTheme)
    }
    if (storedSize) {
      setSize(storedSize)
    }
  }, [])

  // Create context values for settings components
  const dataSourceContext = {
    dataSource,
    setDataSource: (source: DataSource) => {
      setDataSource(source)
      if (typeof window !== 'undefined') {
        localStorage.setItem('polypuls3-data-source', source)
      }
    },
  }

  const themeContext = {
    theme,
    setTheme: (newTheme: ThemePreset) => {
      setTheme(newTheme)
      if (typeof window !== 'undefined') {
        localStorage.setItem('polypuls3-theme', newTheme)
      }
    },
  }

  const sizeContext = {
    size,
    setSize: (newSize: WidgetSize) => {
      setSize(newSize)
      if (typeof window !== 'undefined') {
        localStorage.setItem('polypuls3-size', newSize)
      }
    },
  }

  // Make these available globally for the settings components
  if (typeof window !== 'undefined') {
    ;(window as any).__polypuls3DataSource = dataSourceContext
    ;(window as any).__polypuls3Theme = themeContext
    ;(window as any).__polypuls3Size = sizeContext
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PolyPulseProvider
          dataSourceConfig={{ source: dataSource }}
          themeConfig={{ preset: theme, size }}
        >
          {children}
        </PolyPulseProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
