"use client"

import { PrivyProvider } from '@privy-io/react-auth'

import { MarketplaceProvider } from "@/context/MarketplaceContext"

export function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  
  if (!appId) {
    throw new Error('NEXT_PUBLIC_PRIVY_APP_ID is not defined in environment variables')
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#0d47a1', // Using your project's primary blue color
          logo: 'https://your-logo-url.com/logo.png', // Optional: Add your logo
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        loginMethods: ['wallet', 'email', 'sms'],
        supportedChains: [
          {
            id: 1, // Ethereum Mainnet
            name: 'Ethereum',
            network: 'homestead',
            nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
            rpcUrls: {
              default: { http: ['https://eth.llamarpc.com'] },
              public: { http: ['https://eth.llamarpc.com'] },
            },
            blockExplorers: {
              default: { name: 'Etherscan', url: 'https://etherscan.io' },
            },
          },
        ],
      }}
    >
      <MarketplaceProvider>
        {children}
      </MarketplaceProvider>
    </PrivyProvider>
  )
}
