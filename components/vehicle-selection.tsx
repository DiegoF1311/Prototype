"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Users, Zap } from "lucide-react"

interface VehicleSelectionProps {
  pickup: string
  destination: string
  onSelect: (vehicle: string, price: number) => void
  onBack: () => void
}

const vehicles = [
  {
    id: "uberya",
    name: "UberYa",
    description: "More economical and faster",
    icon: "/xmas_Comfort.png",
    capacity: "4",
    time: "2 min",
    price: 12.5,
    features: ["Economical", "Reliable"],
  },
  {
    id: "uberpet",
    name: "Uber Pet",
    description: "Get moving with your furry friend",
    icon: "/UberX_Pet.png",
    capacity: "4",
    time: "5 min",
    price: 18.75,
    features: ["Mascot", "Spacious vehicles"],
  },
  {
    id: "uberplanet",
    name: "Uber Planet",
    description: "Reduce your carbon footprint",
    icon: "/UberComfort_Green.png",
    capacity: "4",
    time: "8 min",
    price: 27.5,
    features: ["Luxury", "5★ Drivers"],
  },
  {
    id: "xl",
    name: "XL",
    description: "Trips for large groups",
    icon: "xmas_UberXL.png",
    capacity: "6",
    time: "6 min",
    price: 22.0,
    features: ["Up to 6 people", "Extra space"],
  },
]

export function VehicleSelection({ pickup, destination, onSelect, onBack }: VehicleSelectionProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">From: {pickup}</p>
            <p className="text-sm text-muted-foreground">To: {destination}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Map Placeholder */}
        <div className="mb-8 h-64 overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 lg:h-96">
          <div className="flex h-full items-center justify-center">
            <img src="/city-map-with-route.png" alt="Mapa de ruta" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Vehicle Options */}
        <div>
          <h2 className="mb-6 text-2xl font-bold">Choose your ride</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
                onClick={() => onSelect(vehicle.name, vehicle.price)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img src={vehicle.icon} alt="img" className="h-25 w-25 object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {vehicle.capacity}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {vehicle.features.map((feature, index) => (
                            <span key={index} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 flex items-center gap-1 text-sm">
                          <Zap className="h-4 w-4" />
                          {vehicle.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${vehicle.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
