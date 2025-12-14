"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, MessageSquare, Star } from "lucide-react"

interface RideTrackingProps {
  rideData: {
    pickup: string
    destination: string
    vehicle: string
    price: number
  }
  onNewRide: () => void
}

export function RideTracking({ rideData, onNewRide }: RideTrackingProps) {
  const [status, setStatus] = useState<"searching" | "arriving" | "in-progress" | "completed">("searching")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate ride progress
    const statuses: (typeof status)[] = ["searching", "arriving", "in-progress", "completed"]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex++
      if (currentIndex < statuses.length) {
        setStatus(statuses[currentIndex])
        setProgress((currentIndex / (statuses.length - 1)) * 100)
      } else {
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusMessage = () => {
    switch (status) {
      case "searching":
        return "Searching for driver..."
      case "arriving":
        return "Your driver is arriving"
      case "in-progress":
        return "Ride in progress"
      case "completed":
        return "Ride completed!"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-xl font-bold">RideShare</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {status !== "completed" ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Map Section */}
            <div className="order-2 lg:order-1">
              <Card className="overflow-hidden">
                <div className="relative h-96 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/modern-city-street-with-cars.jpg"
                      alt="Live Map"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Card className="p-4">
                      <p className="text-sm font-medium">{getStatusMessage()}</p>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>

            {/* Driver Info */}
            <div className="order-1 space-y-6 lg:order-2">
              {status !== "searching" && (
                <Card className="p-6">
                  <h2 className="mb-4 text-xl font-bold">Your driver</h2>

                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-400">
                      <img src="/professional-driver-avatar.jpg" alt="Driver" className="h-full w-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold">Carlos Rodriguez</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.95</span>
                        <span className="text-sm text-muted-foreground">(1,234 rides)</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">White Toyota Corolla • ABC-123</p>
                  </div>
                </Card>
              )}

              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold">Ride details</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium">{rideData.pickup}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">{rideData.destination}</p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">Vehicle type</p>
                    <p className="font-medium">{rideData.vehicle}</p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Estimated total</span>
                      <span className="text-xl font-bold">${(rideData.price + 2.5).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="mx-auto max-w-2xl text-center">
            <Card className="p-12">
              <div className="mb-8 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    className="h-12 w-12 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h2 className="mb-4 text-3xl font-bold">Ride completed!</h2>
              <p className="mb-8 text-muted-foreground">{"We hope you had a great trip"}</p>

              <div className="mb-8 space-y-4">
                <div className="rounded-lg bg-secondary p-6">
                  <p className="mb-2 text-sm text-muted-foreground">Total charged</p>
                  <p className="text-3xl font-bold">${(rideData.price + 2.5).toFixed(2)}</p>
                </div>

                <div className="rounded-lg border border-border p-6">
                  <p className="mb-4 font-medium">How was your ride?</p>
                  <div className="mb-4 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="transition-transform hover:scale-110">
                        <Star className="h-8 w-8 text-gray-300 hover:fill-yellow-400 hover:text-yellow-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={onNewRide} size="lg" className="w-full">
                Request new ride
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
