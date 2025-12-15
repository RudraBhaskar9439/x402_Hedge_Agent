import { NextResponse } from "next/server"
import { PAYMENT_CONFIG } from "@/lib/payment-middleware"

/**
 * GET /api/payment/amounts
 * Returns payment amounts for all protected routes
 */
export async function GET() {
  const amounts = {
    viewDetails: {
      route: "GET /api/models/[id]/details",
      amount: PAYMENT_CONFIG["GET /api/models/[id]/details"].amount,
      amountWei: PAYMENT_CONFIG["GET /api/models/[id]/details"].amountWei.toString(),
      description: PAYMENT_CONFIG["GET /api/models/[id]/details"].description,
    },
    deposit: {
      route: "POST /api/models/[id]/invest",
      amount: PAYMENT_CONFIG["POST /api/models/[id]/invest"].amount,
      amountWei: PAYMENT_CONFIG["POST /api/models/[id]/invest"].amountWei.toString(),
      description: PAYMENT_CONFIG["POST /api/models/[id]/invest"].description,
    },
    competitionEntry: {
      route: "POST /api/competitions/[id]/enter",
      amount: PAYMENT_CONFIG["POST /api/competitions/[id]/enter"].amount,
      amountWei: PAYMENT_CONFIG["POST /api/competitions/[id]/enter"].amountWei.toString(),
      description: PAYMENT_CONFIG["POST /api/competitions/[id]/enter"].description,
    },
  }

  return NextResponse.json(amounts)
}

