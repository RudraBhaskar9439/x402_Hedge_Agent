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

export async function connectWallet(): Promise<string | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not installed")
  }

  try {
    const accounts = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[]

    return accounts[0] || null
  } catch {
    throw new Error("User rejected connection")
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
