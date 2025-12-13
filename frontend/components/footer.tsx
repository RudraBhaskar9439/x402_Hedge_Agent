"use client"

import { copyToClipboard, formatAddress } from "@/lib/utils"
import { CONTRACTS } from "@/lib/contracts"
import { Button } from "@/components/ui/button"
import { Github, FileText, ExternalLink, Copy, Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 glass">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-gradient">ERC-8004</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The first AI hedge fund on blockchain. Verifiable, trustless, revolutionary.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://sepolia.basescan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                BaseScan
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <FileText className="w-4 h-4" />
                Documentation
              </a>
            </div>
          </div>

          {/* Contracts */}
          <div>
            <h4 className="font-semibold mb-4">Contract Addresses</h4>
            <div className="space-y-2">
              {Object.entries(CONTRACTS).map(([name, address]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{name}:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(address)}
                    className="font-mono text-xs h-6 px-2"
                  >
                    {formatAddress(address)}
                    <Copy className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">Powered by Base L2 Blockchain</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
            <span className="text-xs text-muted-foreground">Base Sepolia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
