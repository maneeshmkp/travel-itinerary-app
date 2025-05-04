"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Calendar,
  MapPin,
  Clock,
  Plane,
  Car,
  Ship,
  Hotel,
  Activity,
  ArrowLeft,
  Share2,
  Download,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Accommodation {
  id: number
  name: string
  location: string
  check_in_date: string
  check_out_date: string
  nights: number
}

interface Transfer {
  id: number
  from_location: string
  to_location: string
  transport_type: string
  date: string
}

interface ItineraryActivity {
  id: number
  name: string
  location: string
  date: string
  duration_hours: number
  description: string
}

interface Itinerary {
  id: number
  title: string
  duration_nights: number
  description: string
  accommodations: Accommodation[]
  transfers: Transfer[]
  activities: ItineraryActivity[]
}

export default function ItineraryDetailPage() {
  const params = useParams()
  const id = params.id
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/itineraries/${id}`)
        if (response.ok) {
          const data = await response.json()
          setItinerary(data)
        } else {
          if (response.status === 404) {
            setError("Itinerary not found")
          } else {
            setError(`Failed to fetch itinerary: ${response.status} ${response.statusText}`)
          }

          // Fallback data for preview
          if (id === "1") {
            setItinerary({
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
            })
            setError(null)
          }
        }
      } catch (error) {
        console.error("Error fetching itinerary:", error)
        setError("An error occurred while fetching the itinerary")

        // Fallback data for preview
        if (id === "1") {
          setItinerary({
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
          })
          setError(null)
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchItinerary()
    }
  }, [id])

  // Group activities by date
  const activitiesByDate =
    itinerary?.activities.reduce(
      (acc, activity) => {
        const date = activity.date
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(activity)
        return acc
      },
      {} as Record<string, ItineraryActivity[]>,
    ) || {}

  // Sort dates
  const sortedDates = Object.keys(activitiesByDate).sort()

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to itineraries</span>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">{error}</h2>
          <p className="text-gray-500 mb-6">The itinerary you're looking for could not be found.</p>
          <Link href="/itineraries">
            <Button>Back to Itineraries</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!itinerary) {
    return null
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-6">
        <Link href="/itineraries" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to itineraries</span>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-teal-700">{itinerary.title}</h1>
            <p className="text-gray-500 mt-2">{itinerary.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{itinerary.duration_nights} Nights</p>
            <p className="text-gray-500 text-sm">
              {itinerary.duration_nights + 1} Days / {itinerary.duration_nights} Nights
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Hotel className="h-5 w-5 text-teal-600" />
              Accommodations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{itinerary.accommodations.length}</p>
            <p className="text-gray-500 text-sm">{itinerary.accommodations.map((a) => a.location).join(", ")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-600" />
              Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{itinerary.activities.length}</p>
            <p className="text-gray-500 text-sm">
              {Array.from(new Set(itinerary.activities.map((a) => a.location)))
                .slice(0, 3)
                .join(", ")}
              {Array.from(new Set(itinerary.activities.map((a) => a.location))).length > 3 && "..."}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="day-by-day" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="day-by-day">Day by Day</TabsTrigger>
          <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="day-by-day">
          <div className="space-y-8">
            {sortedDates.map((date, index) => {
              const dayNumber = index + 1
              const formattedDate = new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })

              // Find accommodations for this day
              const accommodations = itinerary.accommodations.filter(
                (acc) => new Date(acc.check_in_date).toISOString().split("T")[0] === date,
              )

              // Find transfers for this day
              const transfers = itinerary.transfers.filter(
                (transfer) => new Date(transfer.date).toISOString().split("T")[0] === date,
              )

              return (
                <div key={date} className="border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-100 text-teal-700 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                      {dayNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Day {dayNumber}</h3>
                      <p className="text-gray-500 text-sm">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {accommodations.length > 0 && (
                      <div className="pl-4 border-l-2 border-teal-200">
                        <div className="flex items-start gap-3">
                          <Hotel className="h-5 w-5 text-teal-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Check-in: {accommodations[0].name}</h4>
                            <p className="text-gray-500 text-sm">{accommodations[0].location}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {transfers.map((transfer) => (
                      <div key={transfer.id} className="pl-4 border-l-2 border-teal-200">
                        <div className="flex items-start gap-3">
                          {transfer.transport_type.includes("Car") ? (
                            <Car className="h-5 w-5 text-teal-600 mt-0.5" />
                          ) : transfer.transport_type.includes("Boat") || transfer.transport_type.includes("Ferry") ? (
                            <Ship className="h-5 w-5 text-teal-600 mt-0.5" />
                          ) : (
                            <Plane className="h-5 w-5 text-teal-600 mt-0.5" />
                          )}
                          <div>
                            <h4 className="font-medium">
                              Transfer: {transfer.from_location} to {transfer.to_location}
                            </h4>
                            <p className="text-gray-500 text-sm">{transfer.transport_type}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {activitiesByDate[date].map((activity) => (
                      <div key={activity.id} className="pl-4 border-l-2 border-teal-200">
                        <div className="flex items-start gap-3">
                          <Activity className="h-5 w-5 text-teal-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{activity.name}</h4>
                            <p className="text-gray-500 text-sm">{activity.location}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span>{activity.duration_hours} hours</span>
                            </div>
                            <p className="mt-1 text-sm">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="accommodations">
          <div className="space-y-6">
            {itinerary.accommodations.map((accommodation) => (
              <Card key={accommodation.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{accommodation.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {accommodation.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Check-in</p>
                      <p className="font-medium">
                        {new Date(accommodation.check_in_date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Check-out</p>
                      <p className="font-medium">
                        {new Date(accommodation.check_out_date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="font-medium">{accommodation.nights} nights</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transfers">
          <div className="space-y-6">
            {itinerary.transfers.map((transfer) => (
              <Card key={transfer.id}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {transfer.transport_type.includes("Car") ? (
                      <Car className="h-5 w-5 text-teal-600" />
                    ) : transfer.transport_type.includes("Boat") || transfer.transport_type.includes("Ferry") ? (
                      <Ship className="h-5 w-5 text-teal-600" />
                    ) : (
                      <Plane className="h-5 w-5 text-teal-600" />
                    )}
                    {transfer.transport_type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">From</p>
                      <p className="font-medium">{transfer.from_location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">To</p>
                      <p className="font-medium">{transfer.to_location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="font-medium">
                        {new Date(transfer.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities">
          <div className="space-y-6">
            {itinerary.activities.map((activity) => (
              <Card key={activity.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{activity.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {activity.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="font-medium">
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="font-medium">{activity.duration_hours} hours</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Similar Itineraries */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-teal-700">Phuket Explorer</CardTitle>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  5 Nights
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                Comprehensive exploration of Phuket and surrounding islands
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4" />
                <span className="text-gray-500 text-sm ml-1">4.0</span>
              </div>
              <p className="text-sm text-gray-500">Highlights: Phi Phi Islands, Phang Nga Bay, Old Town</p>
            </CardContent>
            <CardFooter>
              <Link href={`/itineraries/2`} className="w-full">
                <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-teal-700">Krabi Beach Retreat</CardTitle>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  4 Nights
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                Relaxing beach vacation in the stunning Krabi province
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <span className="text-gray-500 text-sm ml-1">4.8</span>
              </div>
              <p className="text-sm text-gray-500">Highlights: Four Islands Tour, Rock Climbing, Hong Island</p>
            </CardContent>
            <CardFooter>
              <Link href={`/itineraries/3`} className="w-full">
                <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-teal-700">Thailand Explorer</CardTitle>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  8 Nights
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                Comprehensive exploration of Phuket, Krabi and Phi Phi Islands
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <span className="text-gray-500 text-sm ml-1">4.9</span>
              </div>
              <p className="text-sm text-gray-500">Highlights: Phi Phi Islands, Phang Nga Bay, Four Islands Tour</p>
            </CardContent>
            <CardFooter>
              <Link href={`/itineraries/6`} className="w-full">
                <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
