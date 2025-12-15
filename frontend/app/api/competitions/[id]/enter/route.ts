import { NextRequest, NextResponse } from "next/server"
import { paymentMiddleware, PAYMENT_CONFIG } from "@/lib/payment-middleware"

const middleware = paymentMiddleware(PAYMENT_CONFIG)

/**
 * POST /api/competitions/[id]/enter
 * Protected by x402 payment middleware
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const competitionId = resolvedParams.id
  const body = await req.json()
  const { modelId, entryFee, paymentProof, paymentAddress, paymentAmount } = body

  // Check payment
  const { authorized, error } = await middleware(req, "POST /api/competitions/[id]/enter")
  
  if (!authorized) {
    return NextResponse.json(
      { error: error || "Payment required", requiresPayment: true },
      { status: 402 }
    )
  }

  // Payment verified, process competition entry
  // In production, call smart contract here
  return NextResponse.json({
    success: true,
    competitionId: Number(competitionId),
    modelId: Number(modelId),
    message: "Competition entry processed successfully with x402 micropayment",
  })
}

