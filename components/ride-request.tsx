"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation } from "lucide-react"

interface RideRequestProps {
  onSubmit: (pickup: string, destination: string) => void
}

export function RideRequest({ onSubmit }: RideRequestProps) {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pickup && destination) {
      onSubmit(pickup, destination)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">RideShare</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-2/5 lg:px-12">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-balance">{"Go anywhere with RideShare"}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10 h-14 text-base bg-card"
                  required
                />
              </div>

              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 h-14 text-base bg-card"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-14 text-base" size="lg">
                See prices
              </Button>
            </form>

            <div className="pt-8 text-sm text-muted-foreground">
              <p>
                By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from
                RideShare and its affiliates.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative hidden w-3/5 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <div className="flex h-full items-center justify-center p-12">
              <img
                src="/modern-city-street-with-cars.jpg"
                alt="Ciudad moderna"
                className="h-auto w-full max-w-2xl rounded-lg object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
