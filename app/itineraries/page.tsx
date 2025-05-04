"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface Itinerary {
  id: number
  title: string
  duration_nights: number
  description: string
}

export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [durationFilter, setDurationFilter] = useState("")

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch("/api/itineraries")
        if (response.ok) {
          const data = await response.json()
          setItineraries(data)
          setFilteredItineraries(data)
        } else {
          console.error("Failed to fetch itineraries:", response.status, response.statusText)
          // Fallback data when API is not available
          const fallbackData = [
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
          setItineraries(fallbackData)
          setFilteredItineraries(fallbackData)
        }
      } catch (error) {
        console.error("Error fetching itineraries:", error)
        // Fallback data when API is not available
        const fallbackData = [
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
        setItineraries(fallbackData)
        setFilteredItineraries(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchItineraries()
  }, [])

  useEffect(() => {
    let filtered = itineraries

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (itinerary) =>
          itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          itinerary.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply duration filter
    if (durationFilter) {
      filtered = filtered.filter((itinerary) => itinerary.duration_nights === Number.parseInt(durationFilter))
    }

    setFilteredItineraries(filtered)
  }, [searchTerm, durationFilter, itineraries])

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700 mb-4">
          Browse Itineraries
        </h1>
        <p className="text-gray-500 md:text-xl max-w-3xl">
          Explore our collection of curated travel itineraries for Phuket and Krabi. Find the perfect plan for your
          Thailand adventure.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search itineraries..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 min-w-[200px]">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={durationFilter} onValueChange={setDurationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Duration (nights)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All durations</SelectItem>
              {[2, 3, 4, 5, 6, 7, 8].map((nights) => (
                <SelectItem key={nights} value={nights.toString()}>
                  {nights} nights
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Itineraries Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader>
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
            ))}
        </div>
      ) : filteredItineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItineraries.map((itinerary) => (
            <Card key={itinerary.id} className="h-full flex flex-col">
              <CardHeader>
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
                    <span className="text-sm">
                      {itinerary.title.includes("Phuket") && itinerary.title.includes("Krabi")
                        ? "Phuket & Krabi"
                        : itinerary.title.includes("Phuket")
                          ? "Phuket"
                          : "Krabi"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Available year-round</span>
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
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No itineraries found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setDurationFilter("")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Create New CTA */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold text-teal-700 mb-4">Don't see what you're looking for?</h3>
        <Link href="/create">
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
            Create Custom Itinerary
          </Button>
        </Link>
      </div>
    </div>
  )
}
