'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, walletConnect } from 'wagmi/connectors'
import { ReactNode } from 'react'

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
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
