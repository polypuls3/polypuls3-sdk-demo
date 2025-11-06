'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, walletConnect } from 'wagmi/connectors'
import { ReactNode, useState } from 'react'
import { PolypulsProvider, type DataSource } from '@polypuls3/sdk'

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
  // Get initial data source from localStorage if available
  const [dataSource, setDataSource] = useState<DataSource>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('polypuls3-data-source') as DataSource) || 'auto'
    }
    return 'auto'
  })

  // Create a context value that includes the setter
  const contextValue = {
    dataSource,
    setDataSource: (source: DataSource) => {
      setDataSource(source)
      if (typeof window !== 'undefined') {
        localStorage.setItem('polypuls3-data-source', source)
      }
    },
  }

  // Make this available globally for the settings component
  if (typeof window !== 'undefined') {
    ;(window as any).__polypuls3DataSource = contextValue
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PolypulsProvider dataSourceConfig={{ source: dataSource }}>
          {children}
        </PolypulsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
