import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "ERC-8004 AI Hedge Fund Protocol",
  description:
    "Revolutionary DeFi platform where AI trading models are NFTs that earn from predictions. On-chain, verifiable, trustless.",
  keywords: ["DeFi", "AI", "NFT", "Blockchain", "Trading", "Hedge Fund", "Base", "ERC-8004"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.className} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "rgba(30, 41, 59, 0.9)",
              color: "#f1f5f9",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              backdropFilter: "blur(16px)",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
