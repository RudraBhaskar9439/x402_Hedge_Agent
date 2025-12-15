import { NextRequest, NextResponse } from "next/server"
import { verifyPayment } from "@/lib/payment-middleware"

/**
 * POST /api/payment/verify
 * Verify a payment proof
 */
export async function POST(req: NextRequest) {
  try {
    const { address, amount, proof, route } = await req.json()

    if (!address || !amount || !proof || !route) {
      return NextResponse.json(
        { error: "Missing required fields: address, amount, proof, route" },
        { status: 400 }
      )
    }

    const isValid = await verifyPayment(address, BigInt(amount), proof, route)

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment proof" },
        { status: 402 }
      )
    }

    return NextResponse.json({
      verified: true,
      message: "Payment verified successfully",
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Payment verification failed" },
      { status: 500 }
    )
  }
}

