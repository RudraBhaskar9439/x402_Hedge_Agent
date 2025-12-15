import { NextRequest, NextResponse } from "next/server"
import { paymentMiddleware, PAYMENT_CONFIG } from "@/lib/payment-middleware"

const middleware = paymentMiddleware(PAYMENT_CONFIG)

/**
 * POST /api/models/[id]/invest
 * Protected by x402 payment middleware
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const modelId = resolvedParams.id
  const body = await req.json()
  const { amount, paymentProof, paymentAddress, paymentAmount } = body

  // Check payment
  const { authorized, error } = await middleware(req, "POST /api/models/[id]/invest")
  
  if (!authorized) {
    return NextResponse.json(
      { error: error || "Payment required", requiresPayment: true },
      { status: 402 }
    )
  }

  // Payment verified, process investment
  // In production, call smart contract here
  return NextResponse.json({
    success: true,
    modelId: Number(modelId),
    invested: amount,
    message: "Investment processed successfully with x402 micropayment",
  })
}

