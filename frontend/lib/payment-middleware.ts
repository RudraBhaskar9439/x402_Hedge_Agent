/**
 * X402 Payment Middleware
 * Handles micropayments for API endpoints
 */

import { NextRequest, NextResponse } from "next/server"

// Payment configuration
export const PAYMENT_CONFIG = {
  "GET /api/models/[id]/details": {
    accepts: ["ethereum", "base-sepolia"],
    description: "View model details and analytics",
    amount: "0.0001", // ETH
    amountWei: BigInt("100000000000000"), // 0.0001 ETH in wei
  },
  "POST /api/models/[id]/invest": {
    accepts: ["ethereum", "base-sepolia"],
    description: "Deposit funds into AI model",
    amount: "0.0002", // ETH
    amountWei: BigInt("200000000000000"), // 0.0002 ETH in wei
  },
  "POST /api/competitions/[id]/enter": {
    accepts: ["ethereum", "base-sepolia"],
    description: "Enter model into competition",
    amount: "0.0005", // ETH
    amountWei: BigInt("500000000000000"), // 0.0005 ETH in wei
  },
} as const

export type PaymentRoute = keyof typeof PAYMENT_CONFIG

/**
 * Payment middleware factory
 * Creates middleware for specific routes
 */
export function paymentMiddleware(
  routes: Record<string, { accepts: string[]; description: string; amount: string; amountWei: bigint }>
) {
  return async (req: NextRequest, route: string): Promise<{ authorized: boolean; error?: string }> => {
    const config = routes[route]
    
    if (!config) {
      return { authorized: true } // Route not protected
    }

    // Get payment from request headers or body
    const paymentProof = req.headers.get("x-payment-proof")
    const paymentAddress = req.headers.get("x-payment-address")
    const paymentAmount = req.headers.get("x-payment-amount")

    // For now, we'll verify payment on the backend
    // In production, this would verify on-chain payment or use x402 SDK
    if (!paymentProof || !paymentAddress) {
      return {
        authorized: false,
        error: `Payment required: ${config.description} (${config.amount} ETH)`,
      }
    }

    // Verify payment amount matches
    if (paymentAmount && BigInt(paymentAmount) < config.amountWei) {
      return {
        authorized: false,
        error: `Insufficient payment. Required: ${config.amount} ETH`,
      }
    }

    // TODO: Verify payment proof on-chain or with x402 SDK
    // For now, we'll accept any payment proof (for testing)
    
    return { authorized: true }
  }
}

/**
 * Get payment amount for a route
 */
export function getPaymentAmount(route: string): { amount: string; amountWei: bigint } | null {
  const config = PAYMENT_CONFIG[route as PaymentRoute]
  if (!config) return null
  
  return {
    amount: config.amount,
    amountWei: config.amountWei,
  }
}

/**
 * Verify payment proof
 * In production, this would verify on-chain or with x402 SDK
 */
export async function verifyPayment(
  address: string,
  amount: bigint,
  proof: string,
  route: string
): Promise<boolean> {
  // TODO: Implement actual payment verification
  // For testnet, we can accept any proof
  // In production, verify on-chain transaction or x402 stream
  
  const config = PAYMENT_CONFIG[route as PaymentRoute]
  if (!config) return false
  
  // Verify amount matches
  if (amount < config.amountWei) {
    return false
  }
  
  // For testing, accept any proof
  // In production, verify the proof is valid
  return true
}

