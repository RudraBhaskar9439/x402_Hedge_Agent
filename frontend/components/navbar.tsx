"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn, formatAddress } from "@/lib/utils"
import { useWallet } from "@/hooks/use-wallet"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut, ExternalLink, ChevronDown, Zap, LayoutDashboard, Bot, Trophy, Store, Brain } from "lucide-react"

const navLinks = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/models", label: "Models", icon: Bot },
  { href: "/competitions", label: "Competitions", icon: Trophy },
  { href: "/marketplace", label: "Marketplace", icon: Store },
]

export function Navbar() {
  const pathname = usePathname()
  const { address, isConnected, isConnecting, isCorrectChain, connect, disconnect, switchNetwork } = useWallet()

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              AgentAlpha
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  pathname === href
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Wallet Connect */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <>
                {/* Chain Badge */}
                {isCorrectChain ? (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-green/20 text-neon-green text-xs font-medium">
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
                    Base Sepolia
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={switchNetwork}
                    className="text-destructive border-destructive/50 hover:bg-destructive/20 bg-transparent"
                  >
                    Switch Network
                  </Button>
                )}

                {/* Wallet Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 gradient-border bg-transparent">
                      <Wallet className="w-4 h-4 text-primary" />
                      <span className="font-mono text-sm">{formatAddress(address!)}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass">
                    <DropdownMenuItem asChild>
                      <a
                        href={`https://sepolia.basescan.org/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on BaseScan
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={disconnect} className="text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={connect}
                disabled={isConnecting}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
