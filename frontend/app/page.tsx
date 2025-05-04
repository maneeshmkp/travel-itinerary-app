"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Clock, TreePalmIcon as PalmTree } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface Itinerary {
  id: number
  title: string
  duration_nights: number
  description: string
}

export default function Home() {
  const [featuredItineraries, setFeaturedItineraries] = useState<Itinerary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch("/api/itineraries?limit=3", {
          cache: "no-store", 
        })
        if (response.ok) {
          const data = await response.json()
          setFeaturedItineraries(data)
        } else {
          console.error("Failed to fetch itineraries:", response.status, response.statusText)
          // Fallback data when API is not available
          setFeaturedItineraries([
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
          ])
        }
      } catch (error) {
        console.error("Error fetching itineraries:", error)
        // Fallback data when API is not available
        setFeaturedItineraries([
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
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchItineraries()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Thailand's Paradise
              </h1>
              <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
                Explore curated travel itineraries for Phuket and Krabi. Plan your perfect Thai getaway with our
                expertly crafted travel plans.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/itineraries">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90">
                  Browse Itineraries
                </Button>
              </Link>
              <Link href="/recommendations">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Get Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Itineraries */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700">
                Featured Itineraries
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our most popular travel plans for Thailand's beautiful destinations.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-6 py-12">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="h-full">
                      <CardHeader className="pb-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-24 w-full mb-4" />
                        <div className="flex items-center gap-2 mb-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))
              : featuredItineraries.map((itinerary) => (
                  <Card key={itinerary.id} className="h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-teal-700">{itinerary.title}</CardTitle>
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                          {itinerary.duration_nights} Nights
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{itinerary.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">Thailand</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">Available year-round</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <PalmTree className="h-4 w-4" />
                          <span className="text-sm">Beach, Adventure, Culture</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/itineraries/${itinerary.id}`} className="w-full">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
          </div>
          <div className="flex justify-center">
            <Link href="/itineraries">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                View All Itineraries
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700">
                Plan Your Perfect Trip
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our travel itinerary system makes planning your Thailand vacation simple and stress-free.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-8 py-12">
            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
              <div className="p-3 rounded-full bg-teal-100 text-teal-700">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-teal-700">Day-by-Day Planning</h3>
              <p className="text-center text-gray-500">
                Detailed itineraries with accommodations, transfers, and activities for each day of your trip.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
              <div className="p-3 rounded-full bg-teal-100 text-teal-700">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-teal-700">Curated Destinations</h3>
              <p className="text-center text-gray-500">
                Expertly selected locations in Phuket and Krabi to experience the best of Thailand.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
              <div className="p-3 rounded-full bg-teal-100 text-teal-700">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-teal-700">Smart Recommendations</h3>
              <p className="text-center text-gray-500">
                Get personalized itinerary recommendations based on your preferred trip duration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-teal-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700">
                Ready to Start Planning?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create your own custom itinerary or get recommendations based on your travel preferences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Create New Itinerary
                </Button>
              </Link>
              <Link href="/recommendations">
                <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  Get Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
