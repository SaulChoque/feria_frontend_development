"use client"

import { PrivyProvider } from '@privy-io/react-auth'
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider'

import { MarketplaceProvider } from "@/context/MarketplaceContext"

export function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  const worldAppId = process.env.NEXT_PUBLIC_WORLD_APP_ID
  // If environment variables are missing, warn instead of throwing so
  // Next.js prerender/build doesn't fail in environments where these
  // values are not yet configured (for example: CI or preview builds).
  // Production deployments should set these in Vercel (Project > Settings > Environment Variables).
  const missing = [] as string[]
  if (!appId) missing.push("NEXT_PUBLIC_PRIVY_APP_ID")
  if (!worldAppId) missing.push("NEXT_PUBLIC_WORLD_APP_ID")
  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `Missing env vars: ${missing.join(", ")} - Privy/World App providers will be disabled. Set them in your deployment environment (e.g. Vercel).`,
    )
    // Render children without providers to avoid build-time failures.
    return <>{children}</>
  }

  // At this point both env vars are present. Narrow types for TS using non-null assertion.
  const privyAppId = appId as string
  const miniKitAppId = worldAppId as string

  return (
    <MiniKitProvider props={{ appId: miniKitAppId }}>
      <PrivyProvider
        appId={privyAppId}
        config={{
          appearance: {
            theme: 'light',
            accentColor: '#0d47a1', // Using your project's primary blue color
            logo: 'https://pixsector.com/cache/a35c7d7b/avd437689ef3a02914ac1.png', // Optional: Add your logo
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
    </MiniKitProvider>
  )
}
