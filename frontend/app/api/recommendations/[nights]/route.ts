// This file provides a fallback API route for when the backend is not available (e.g., in preview)

import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { nights: string } }) {
  const nights = Number.parseInt(params.nights, 10)

  // Sample recommendations data for the preview environment
  const recommendations = [
    {
      id: 1,
      title: "Phuket Adventure",
      duration_nights: nights,
      description: "Explore the beautiful beaches and culture of Phuket",
      recommendation_score: 0.95,
      highlights: ["Phi Phi Islands Tour", "Patong Beach", "Old Town Exploration"],
    },
    {
      id: 2,
      title: "Krabi Relaxation",
      duration_nights: nights,
      description: "Relaxing beach vacation in the stunning Krabi province",
      recommendation_score: 0.88,
      highlights: ["Railay Beach", "Four Islands Tour", "Hot Springs Visit"],
    },
  ]

  return NextResponse.json(recommendations)
}
