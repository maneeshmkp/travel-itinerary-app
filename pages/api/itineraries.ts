
// This file provides a fallback API route for when the backend is not available (e.g., in preview)

import { NextApiRequest, NextApiResponse } from "next"

// Sample data for the preview environment
export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

if (req.method === "GET") {
    res.status(200).json(sampleItineraries)
  } else {
    res.status(405).end("Method Not Allowed")
  }
}
