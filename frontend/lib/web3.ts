import { BrowserProvider, JsonRpcProvider, Contract, formatEther, parseEther } from "ethers"
import { CHAIN_ID, BASE_SEPOLIA_RPC, CONTRACTS, REGISTRY_ABI, MARKETPLACE_ABI, COMPETITION_ABI } from "./contracts"

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void
      isMetaMask?: boolean
    }
  }
}

/**
 * Get the MetaMask provider, prioritizing it over other wallets
 */
function getMetaMaskProvider() {
  if (typeof window === "undefined") return null

  // Check if MetaMask is available
  if (window.ethereum?.isMetaMask) {
    return window.ethereum
  }

  // Check for multiple providers (e.g., MetaMask + Phantom)
  if ((window.ethereum as any)?.providers) {
    const providers = (window.ethereum as any).providers
    const metamask = providers.find((p: any) => p.isMetaMask)
    if (metamask) return metamask
  }

  // Fallback to window.ethereum
  return window.ethereum
}

export async function connectWallet(): Promise<string | null> {
  if (typeof window === "undefined") {
    throw new Error("Window object not available")
  }

  const provider = getMetaMaskProvider()

  if (!provider) {
    throw new Error(
      "MetaMask not found. Please install MetaMask extension."
    )
  }

  try {
    // First check if already connected
    const existingAccounts = (await provider.request({
      method: "eth_accounts",
    })) as string[]

    if (existingAccounts && existingAccounts.length > 0) {
      return existingAccounts[0]
    }

    // Request connection
    const accounts = (await provider.request({
      method: "eth_requestAccounts",
    })) as string[]

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock your wallet.")
    }

    return accounts[0] || null
  } catch (error: unknown) {
    // Handle specific error types
    if (error && typeof error === "object" && "code" in error) {
      const errorCode = (error as { code: number }).code

      // User rejected the connection request (4001)
      if (errorCode === 4001) {
        // Don't throw for user rejection - it's intentional
        return null
      }

      // Request already pending (-32002)
      if (errorCode === -32002) {
        throw new Error("Connection request already pending. Please check your wallet and approve the request.")
      }

      // Unauthorized (4100)
      if (errorCode === 4100) {
        throw new Error("Unauthorized. Please unlock your wallet and try again.")
      }

      // Unsupported method (4200)
      if (errorCode === 4200) {
        throw new Error("Unsupported method. Please update your wallet to the latest version.")
      }

      // Disconnected (4900)
      if (errorCode === 4900) {
        throw new Error("Wallet disconnected. Please reconnect your wallet.")
      }

      // Chain disconnected (4901)
      if (errorCode === 4901) {
        throw new Error("Chain disconnected. Please switch to a supported network.")
      }
    }

    // Handle error messages
    if (error && typeof error === "object" && "message" in error) {
      const errorMessage = (error as { message: string }).message.toLowerCase()

      // User rejection - return null silently
      if (errorMessage.includes("reject") || errorMessage.includes("denied") || errorMessage.includes("user rejected")) {
        return null
      }

      // Pending request
      if (errorMessage.includes("already pending") || errorMessage.includes("pending")) {
        throw new Error("Connection request already pending. Please check your wallet.")
      }

      // Return the original error message if it's informative
      throw new Error((error as { message: string }).message)
    }

    // Generic fallback
    throw new Error("Failed to connect wallet. Please try again.")
  }
}

export async function switchToBaseSepolia(): Promise<boolean> {
  if (!window.ethereum) return false

  const chainIdHex = `0x${CHAIN_ID.toString(16)}`

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    })
    return true
  } catch (switchError: unknown) {
    const error = switchError as { code: number }
    // Chain not added, try to add it
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainIdHex,
              chainName: "Base Sepolia",
              nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
              rpcUrls: [BASE_SEPOLIA_RPC],
              blockExplorerUrls: ["https://sepolia.basescan.org"],
            },
          ],
        })
        return true
      } catch {
        return false
      }
    }
    return false
  }
}

export async function getCurrentChainId(): Promise<number | null> {
  if (!window.ethereum) return null

  try {
    const chainId = (await window.ethereum.request({ method: "eth_chainId" })) as string
    return Number.parseInt(chainId, 16)
  } catch {
    return null
  }
}

export function getProvider(): JsonRpcProvider {
  return new JsonRpcProvider(BASE_SEPOLIA_RPC)
}

export async function getBrowserProvider(): Promise<BrowserProvider | null> {
  if (!window.ethereum) return null
  return new BrowserProvider(window.ethereum)
}

export function getRegistryContract(providerOrSigner: JsonRpcProvider | BrowserProvider | unknown): Contract {
  return new Contract(CONTRACTS.REGISTRY, REGISTRY_ABI, providerOrSigner as JsonRpcProvider)
}

export function getMarketplaceContract(providerOrSigner: JsonRpcProvider | BrowserProvider | unknown): Contract {
  return new Contract(CONTRACTS.MARKETPLACE, MARKETPLACE_ABI, providerOrSigner as JsonRpcProvider)
}

export function getCompetitionContract(providerOrSigner: JsonRpcProvider | BrowserProvider | unknown): Contract {
  return new Contract(CONTRACTS.COMPETITION, COMPETITION_ABI, providerOrSigner as JsonRpcProvider)
}

export { formatEther, parseEther }
