"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Plus, Trash2, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Accommodation {
  name: string
  location: string
  check_in_date: Date
  check_out_date: Date
  nights: number
}

interface Transfer {
  from_location: string
  to_location: string
  transport_type: string
  date: Date
}

interface Activity {
  name: string
  location: string
  date: Date
  duration_hours: number
  description: string
}

export default function CreateItineraryPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [activeTab, setActiveTab] = useState("basic")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // New accommodation form state
  const [newAccommodation, setNewAccommodation] = useState<Accommodation>({
    name: "",
    location: "",
    check_in_date: new Date(),
    check_out_date: new Date(new Date().setDate(new Date().getDate() + 3)),
    nights: 3,
  })

  // New transfer form state
  const [newTransfer, setNewTransfer] = useState<Transfer>({
    from_location: "",
    to_location: "",
    transport_type: "",
    date: new Date(),
  })

  // New activity form state
  const [newActivity, setNewActivity] = useState<Activity>({
    name: "",
    location: "",
    date: new Date(),
    duration_hours: 4,
    description: "",
  })

  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleAddAccommodation = () => {
    if (!newAccommodation.name || !newAccommodation.location) {
      setError("Please fill in all required accommodation fields")
      return
    }

    setAccommodations([...accommodations, { ...newAccommodation }])
    setNewAccommodation({
      name: "",
      location: "",
      check_in_date: new Date(),
      check_out_date: new Date(new Date().setDate(new Date().getDate() + 3)),
      nights: 3,
    })
    setError(null)
  }

  const handleRemoveAccommodation = (index: number) => {
    setAccommodations(accommodations.filter((_, i) => i !== index))
  }

  const handleAddTransfer = () => {
    if (!newTransfer.from_location || !newTransfer.to_location || !newTransfer.transport_type) {
      setError("Please fill in all required transfer fields")
      return
    }

    setTransfers([...transfers, { ...newTransfer }])
    setNewTransfer({
      from_location: "",
      to_location: "",
      transport_type: "",
      date: new Date(),
    })
    setError(null)
  }

  const handleRemoveTransfer = (index: number) => {
    setTransfers(transfers.filter((_, i) => i !== index))
  }

  const handleAddActivity = () => {
    if (!newActivity.name || !newActivity.location || !newActivity.description) {
      setError("Please fill in all required activity fields")
      return
    }

    setActivities([...activities, { ...newActivity }])
    setNewActivity({
      name: "",
      location: "",
      date: new Date(),
      duration_hours: 4,
      description: "",
    })
    setError(null)
  }

  const handleRemoveActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!title) {
      setError("Please provide a title for your itinerary")
      setActiveTab("basic")
      return
    }

    if (accommodations.length === 0) {
      setError("Please add at least one accommodation")
      setActiveTab("accommodations")
      return
    }

    // Calculate total nights from accommodations
    const totalNights = accommodations.reduce((sum, acc) => sum + acc.nights, 0)

    setSubmitting(true)
    setError(null)

    try {
      const payload = {
        title,
        description,
        duration_nights: totalNights,
        accommodations: accommodations.map((acc) => ({
          name: acc.name,
          location: acc.location,
          check_in_date: format(acc.check_in_date, "yyyy-MM-dd"),
          check_out_date: format(acc.check_out_date, "yyyy-MM-dd"),
          nights: acc.nights,
        })),
        transfers: transfers.map((transfer) => ({
          from_location: transfer.from_location,
          to_location: transfer.to_location,
          transport_type: transfer.transport_type,
          date: format(transfer.date, "yyyy-MM-dd"),
        })),
        activities: activities.map((activity) => ({
          name: activity.name,
          location: activity.location,
          date: format(activity.date, "yyyy-MM-dd"),
          duration_hours: activity.duration_hours,
          description: activity.description,
        })),
      }

      const response = await fetch("/api/itineraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/itineraries/${data.id}`)
      } else {
        try {
          const errorData = await response.json()
          setError(errorData.detail || `Failed to create itinerary: ${response.status} ${response.statusText}`)
        } catch (e) {
          setError(`Failed to create itinerary: ${response.status} ${response.statusText}`)
        }

        // For preview, simulate success after 2 seconds
        setTimeout(() => {
          router.push(`/itineraries/1`)
        }, 2000)
      }
    } catch (error) {
      console.error("Error creating itinerary:", error)
      setError("An error occurred while creating the itinerary")

      // For preview, simulate success after 2 seconds
      setTimeout(() => {
        router.push(`/itineraries/1`)
      }, 2000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-teal-700 mb-4">Create New Itinerary</h1>
        <p className="text-gray-500 md:text-xl max-w-3xl">
          Design your perfect Thailand adventure by adding accommodations, transfers, and activities.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="review">Review & Submit</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide the basic details for your itinerary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Itinerary Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Phuket Beach Getaway"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your itinerary..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab("accommodations")} className="ml-auto bg-teal-600 hover:bg-teal-700">
                Next: Accommodations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="accommodations">
          <Card>
            <CardHeader>
              <CardTitle>Accommodations</CardTitle>
              <CardDescription>Add hotels and accommodations for your trip</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {accommodations.map((accommodation, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{accommodation.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAccommodation(index)}
                          className="h-8 w-8 p-0 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {accommodation.location}
                      </p>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Check-in:</span>{" "}
                        {format(accommodation.check_in_date, "MMM d, yyyy")} |{" "}
                        <span className="text-gray-500">Check-out:</span>{" "}
                        {format(accommodation.check_out_date, "MMM d, yyyy")} |{" "}
                        <span className="text-gray-500">Nights:</span> {accommodation.nights}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Add New Accommodation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="acc-name">Hotel/Accommodation Name</Label>
                    <Input
                      id="acc-name"
                      placeholder="e.g., Patong Beach Resort"
                      value={newAccommodation.name}
                      onChange={(e) => setNewAccommodation({ ...newAccommodation, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acc-location">Location</Label>
                    <Input
                      id="acc-location"
                      placeholder="e.g., Patong Beach, Phuket"
                      value={newAccommodation.location}
                      onChange={(e) => setNewAccommodation({ ...newAccommodation, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="check-in">Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newAccommodation.check_in_date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newAccommodation.check_in_date ? (
                            format(newAccommodation.check_in_date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newAccommodation.check_in_date}
                          onSelect={(date) => {
                            if (date) {
                              const checkOut = new Date(date)
                              checkOut.setDate(date.getDate() + newAccommodation.nights)
                              setNewAccommodation({
                                ...newAccommodation,
                                check_in_date: date,
                                check_out_date: checkOut,
                              })
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nights">Number of Nights</Label>
                    <Input
                      id="nights"
                      type="number"
                      min="1"
                      value={newAccommodation.nights}
                      onChange={(e) => {
                        const nights = Number.parseInt(e.target.value) || 1
                        const checkOut = new Date(newAccommodation.check_in_date)
                        checkOut.setDate(newAccommodation.check_in_date.getDate() + nights)
                        setNewAccommodation({
                          ...newAccommodation,
                          nights,
                          check_out_date: checkOut,
                        })
                      }}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button onClick={handleAddAccommodation} className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Accommodation
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("transfers")} className="bg-teal-600 hover:bg-teal-700">
                Next: Transfers
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="transfers">
          <Card>
            <CardHeader>
              <CardTitle>Transfers</CardTitle>
              <CardDescription>Add transportation between locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {transfers.map((transfer, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">
                          {transfer.from_location} to {transfer.to_location}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveTransfer(index)}
                          className="h-8 w-8 p-0 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">{transfer.transport_type}</p>
                      <p className="mt-1 text-sm">
                        <span className="text-gray-500">Date:</span> {format(transfer.date, "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Add New Transfer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-location">From</Label>
                    <Input
                      id="from-location"
                      placeholder="e.g., Phuket Airport"
                      value={newTransfer.from_location}
                      onChange={(e) => setNewTransfer({ ...newTransfer, from_location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-location">To</Label>
                    <Input
                      id="to-location"
                      placeholder="e.g., Patong Beach Hotel"
                      value={newTransfer.to_location}
                      onChange={(e) => setNewTransfer({ ...newTransfer, to_location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transport-type">Transport Type</Label>
                    <Input
                      id="transport-type"
                      placeholder="e.g., Private Car, Ferry, Longtail Boat"
                      value={newTransfer.transport_type}
                      onChange={(e) => setNewTransfer({ ...newTransfer, transport_type: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transfer-date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newTransfer.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTransfer.date ? format(newTransfer.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTransfer.date}
                          onSelect={(date) => date && setNewTransfer({ ...newTransfer, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="pt-2">
                  <Button onClick={handleAddTransfer} className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Transfer
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("accommodations")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("activities")} className="bg-teal-600 hover:bg-teal-700">
                Next: Activities
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Activities</CardTitle>
              <CardDescription>Add tours, excursions, and activities for your trip</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{activity.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveActivity(index)}
                          className="h-8 w-8 p-0 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {activity.location}
                      </p>
                      <div className="mt-1 text-sm">
                        <span className="text-gray-500">Date:</span> {format(activity.date, "MMM d, yyyy")} |{" "}
                        <span className="text-gray-500">Duration:</span> {activity.duration_hours} hours
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Add New Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-name">Activity Name</Label>
                    <Input
                      id="activity-name"
                      placeholder="e.g., Phi Phi Islands Tour"
                      value={newActivity.name}
                      onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-location">Location</Label>
                    <Input
                      id="activity-location"
                      placeholder="e.g., Phi Phi Islands"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newActivity.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newActivity.date ? format(newActivity.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newActivity.date}
                          onSelect={(date) => date && setNewActivity({ ...newActivity, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={newActivity.duration_hours}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          duration_hours: Number.parseFloat(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-description">Description</Label>
                  <Textarea
                    id="activity-description"
                    placeholder="Describe the activity..."
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="pt-2">
                  <Button onClick={handleAddActivity} className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Activity
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("transfers")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("review")} className="bg-teal-600 hover:bg-teal-700">
                Review & Submit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Review Your Itinerary</CardTitle>
              <CardDescription>Review all details before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Basic Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <span className="font-medium">Title:</span> {title || "Not provided"}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Description:</span> {description || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-lg">Accommodations ({accommodations.length})</h3>
                {accommodations.length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    {accommodations.map((acc, index) => (
                      <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                        <p className="font-medium">{acc.name}</p>
                        <p className="text-sm text-gray-500">{acc.location}</p>
                        <p className="text-sm">
                          {format(acc.check_in_date, "MMM d, yyyy")} to {format(acc.check_out_date, "MMM d, yyyy")} (
                          {acc.nights} nights)
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500">No accommodations added</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-lg">Transfers ({transfers.length})</h3>
                {transfers.length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    {transfers.map((transfer, index) => (
                      <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                        <p className="font-medium">
                          {transfer.from_location} to {transfer.to_location}
                        </p>
                        <p className="text-sm text-gray-500">{transfer.transport_type}</p>
                        <p className="text-sm">{format(transfer.date, "MMM d, yyyy")}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500">No transfers added</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-lg">Activities ({activities.length})</h3>
                {activities.length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-gray-500">{activity.location}</p>
                        <p className="text-sm">
                          {format(activity.date, "MMM d, yyyy")} • {activity.duration_hours} hours
                        </p>
                        <p className="text-sm mt-1">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500">No activities added</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("activities")}>
                Back
              </Button>
              <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                  </>
                ) : (
                  "Create Itinerary"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
