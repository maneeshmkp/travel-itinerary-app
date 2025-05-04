// This file provides a fallback API route for when the backend is not available (e.g., in preview)

import { NextResponse } from "next/server"

// Sample data for the preview environment

const sampleItineraries = [
  {
    id: 1,
    title: "Phuket Adventure",
    duration_nights: 4,
    description: "Explore the beautiful beaches and culture of Phuket",
  },
  {
    id: 2,
    title: "Krabi Relaxation",
    duration_nights: 5,
    description: "Relaxing beach vacation in the stunning Krabi province",
  },
  {
    id: 3,
    title: "Thailand Explorer",
    duration_nights: 7,
    description: "Comprehensive exploration of Phuket, Krabi and Phi Phi Islands",
  },
  {
    id: 4,
    title: "Phuket & Krabi Combo",
    duration_nights: 6,
    description: "Experience the best of both Phuket and Krabi",
  },
]

export async function GET(request: Request) {
  // Check if there's a limit parameter
  const url = new URL(request.url)
  const limit = url.searchParams.get("limit")

  if (limit) {
    const limitNum = Number.parseInt(limit, 10)
    return NextResponse.json(sampleItineraries.slice(0, limitNum))
  }

  return NextResponse.json(sampleItineraries)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real implementation, this would save to a database
    // For preview, just return a mock response
    return NextResponse.json(
      {
        id: 5,
        title: body.title,
        duration_nights: body.duration_nights,
        description: body.description,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 400 })
  }
}
