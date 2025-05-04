// // This file provides a fallback API route for when the backend is not available (e.g., in preview)

// import { NextResponse } from "next/server"

// // Sample detailed itinerary data for the preview environment
// const sampleItinerary = {
//   id: 1,
//   title: "Phuket Adventure",
//   duration_nights: 4,
//   description: "Explore the beautiful beaches and culture of Phuket",
//   accommodations: [
//     {
//       id: 1,
//       name: "Beachfront Resort",
//       location: "Patong Beach",
//       check_in_date: "2023-06-01",
//       check_out_date: "2023-06-05",
//       nights: 4,
//     },
//   ],
//   transfers: [
//     {
//       id: 1,
//       from_location: "Phuket Airport",
//       to_location: "Patong Beach",
//       transport_type: "Private Car",
//       date: "2023-06-01",
//     },
//     {
//       id: 2,
//       from_location: "Patong Beach",
//       to_location: "Phuket Airport",
//       transport_type: "Private Car",
//       date: "2023-06-05",
//     },
//   ],
//   activities: [
//     {
//       id: 1,
//       name: "Phi Phi Islands Tour",
//       location: "Phi Phi Islands",
//       date: "2023-06-02",
//       duration_hours: 8,
//       description: "Full day tour of the stunning Phi Phi Islands",
//     },
//     {
//       id: 2,
//       name: "Old Town Walking Tour",
//       location: "Phuket Old Town",
//       date: "2023-06-03",
//       duration_hours: 4,
//       description: "Explore the charming streets and architecture of Phuket Old Town",
//     },
//     {
//       id: 3,
//       name: "Phang Nga Bay Tour",
//       location: "Phang Nga Bay",
//       date: "2023-06-04",
//       duration_hours: 8,
//       description: "Visit the famous James Bond Island and explore the stunning limestone karsts",
//     },
//   ],
// }

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   const {id} = params

//   const itinerary = sampleItinerary.find((itinerary: { id: number }) => itinerary.id === Number(id))

// //   // For preview, just return the sample data if id is 1
// //   if (id === "1") {
// //     return NextResponse.json(sampleItinerary)
// //   }

// //   // Otherwise return a 404
// //   return NextResponse.json({ detail: "Itinerary not found" }, { status: 404 })
// // }
// if (!itinerary) {
//   return NextResponse.json({ error: "Itinerary not found" }, { status: 404 })
// }

// return NextResponse.json(itinerary)
// }

import { NextResponse } from "next/server"

// Sample detailed itinerary data for the preview environment
const sampleItinerary = {
  id: 1,
  title: "Phuket Adventure",
  duration_nights: 4,
  description: "Explore the beautiful beaches and culture of Phuket",
  accommodations: [
    {
      id: 1,
      name: "Beachfront Resort",
      location: "Patong Beach",
      check_in_date: "2023-06-01",
      check_out_date: "2023-06-05",
      nights: 4,
    },
  ],
  transfers: [
    {
      id: 1,
      from_location: "Phuket Airport",
      to_location: "Patong Beach",
      transport_type: "Private Car",
      date: "2023-06-01",
    },
    {
      id: 2,
      from_location: "Patong Beach",
      to_location: "Phuket Airport",
      transport_type: "Private Car",
      date: "2023-06-05",
    },
  ],
  activities: [
    {
      id: 1,
      name: "Phi Phi Islands Tour",
      location: "Phi Phi Islands",
      date: "2023-06-02",
      duration_hours: 8,
      description: "Full day tour of the stunning Phi Phi Islands",
    },
    {
      id: 2,
      name: "Old Town Walking Tour",
      location: "Phuket Old Town",
      date: "2023-06-03",
      duration_hours: 4,
      description: "Explore the charming streets and architecture of Phuket Old Town",
    },
    {
      id: 3,
      name: "Phang Nga Bay Tour",
      location: "Phang Nga Bay",
      date: "2023-06-04",
      duration_hours: 8,
      description: "Visit the famous James Bond Island and explore the stunning limestone karsts",
    },
  ],
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  // Check if the ID matches the sample itinerary's ID
  if (Number(id) === sampleItinerary.id) {
    return NextResponse.json(sampleItinerary)
  }

  // Return a 404 if the ID doesn't match
  return NextResponse.json({ error: "Itinerary not found" }, { status: 404 })
}
