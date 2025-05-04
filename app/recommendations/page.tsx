"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ThumbsUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"

interface RecommendedItinerary {
  id: number
  title: string
  duration_nights: number
  description: string
  recommendation_score: number
  highlights: string[]
}

export default function RecommendationsPage() {
  const [nights, setNights] = useState<number>(5)
  const [recommendations, setRecommendations] = useState<RecommendedItinerary[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleGetRecommendations = async () => {
    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch(`/api/recommendations/${nights}`);
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      } else {
        console.error("Failed to fetch recommendations:", response.status, response.statusText);
        // Fallback data for preview
        setRecommendations([
          {
            id: 1,
            title: "Phuket Adventure",
            duration_nights: nights,
            description: "Explore the beautiful beaches and culture of Phuket",
            recommendation_score: 0.95,
            highlights: [
              "Phi Phi Islands Tour",
              "Patong Beach",
              "Old Town Exploration"
            ]
          },
          {
            id: 2,
            title: "Krabi Relaxation",
            duration_nights: nights,
            description: "Relaxing beach vacation in the stunning Krabi province",
            recommendation_score: 0.88,
            highlights: [
              "Railay Beach",
              "Four Islands Tour",
              "Hot Springs Visit"
            ]
          }
        ]);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      // Fallback data for preview
      setRecommendations([
        {
          id: 1,
          title: "Phuket Adventure",
          duration_nights: nights,
          description: "Explore the beautiful beaches and culture of Phuket",
          recommendation_score: 0.95,
          highlights: [
            "Phi Phi Islands Tour",
            "Patong Beach",
            "Old Town Exploration"
          ]
        },
        {
          id: 2,
          title: "Krabi Relaxation",
          duration_nights: nights,
          description: "Relaxing beach vacation in the stunning Krabi province",
          recommendation_score: 0.88,
          highlights: [
            "Railay Beach",
            "Four Islands Tour",
            "Hot Springs Visit"
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-teal-700 mb-4">
          Get Personalized Recommendations
        </h1>
        <p className="text-gray-500 md:text-xl">
          Tell us how long you want to stay, and we'll recommend the perfect itineraries for your Thailand adventure.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-12">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-teal-700 mb-4">How many nights do you want to stay?</h2>
          <div className="space-y-6">
            <div className="flex justify-between text-sm text-gray-500 px-2">
              <span>2 nights</span>
              <span>5 nights</span>
              <span>8 nights</span>
            </div>
            <Slider
              value={[nights]}
              min={2}
              max={8}
              step={1}
              onValueChange={(value) => setNights(value[0])}
              className="w-full"
            />
            <div className="text-center">
              <Badge variant="outline" className="text-lg py-1 px-4 bg-teal-50 text-teal-700 border-teal-200">
                {nights} {nights === 1 ? "night" : "nights"}
              </Badge>
            </div>
          </div>
        </div>
        <Button onClick={handleGetRecommendations} className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
          Get Recommendations
        </Button>
      </div>

      {searched && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-teal-700 mb-6">
            {loading
              ? "Finding the perfect itineraries for you..."
              : recommendations.length > 0
                ? `Recommended Itineraries for ${nights} Nights`
                : "No recommendations found"}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-24 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-full" />
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((itinerary) => (
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
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsUp className="h-4 w-4 text-teal-600" />
                      <span className="text-sm font-medium">
                        {Math.round(itinerary.recommendation_score * 100)}% match for your preferences
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-700 mb-2">Highlights:</h4>
                    <ul className="space-y-1">
                      {itinerary.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
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
              <p className="text-gray-500 mb-6">
                We couldn't find any itineraries matching your criteria. Try adjusting your preferences or create a
                custom itinerary.
              </p>
              <Link href="/create">
                <Button className="bg-teal-600 hover:bg-teal-700">Create Custom Itinerary</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
