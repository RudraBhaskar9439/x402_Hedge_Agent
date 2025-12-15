import { NextRequest, NextResponse } from "next/server"
import { paymentMiddleware, PAYMENT_CONFIG } from "@/lib/payment-middleware"

const middleware = paymentMiddleware(PAYMENT_CONFIG)

/**
 * GET /api/models/[id]/details
 * Protected by x402 payment middleware
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const modelId = resolvedParams.id

  // Check payment
  const { authorized, error } = await middleware(req, "GET /api/models/[id]/details")
  
  if (!authorized) {
    return NextResponse.json(
      { error: error || "Payment required", requiresPayment: true },
      { status: 402 } // Payment Required
    )
  }

  // Payment verified, return model details
  // In production, fetch from contract or database
  return NextResponse.json({
    modelId: Number(modelId),
    details: "Full model details unlocked after payment",
    // Add actual model data here
  })
}

