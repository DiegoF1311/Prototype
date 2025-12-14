"use client"

import { useState } from "react"
import { RideRequest } from "@/components/ride-request"
import { VehicleSelection } from "@/components/vehicle-selection"
import { PaymentProcess } from "@/components/payment-process"
import { RideTracking } from "@/components/ride-tracking"

export default function Home() {
  const [step, setStep] = useState<"request" | "vehicle" | "payment" | "tracking">("request")
  const [rideData, setRideData] = useState({
    pickup: "",
    destination: "",
    vehicle: "",
    price: 0,
  })

  const handleRideRequest = (pickup: string, destination: string) => {
    setRideData({ ...rideData, pickup, destination })
    setStep("vehicle")
  }

  const handleVehicleSelection = (vehicle: string, price: number) => {
    setRideData({ ...rideData, vehicle, price })
    setStep("payment")
  }

  const handlePaymentComplete = () => {
    setStep("tracking")
  }

  const handleNewRide = () => {
    setRideData({ pickup: "", destination: "", vehicle: "", price: 0 })
    setStep("request")
  }

  return (
    <div className="min-h-screen bg-background">
      {step === "request" && <RideRequest onSubmit={handleRideRequest} />}
      {step === "vehicle" && (
        <VehicleSelection
          pickup={rideData.pickup}
          destination={rideData.destination}
          onSelect={handleVehicleSelection}
          onBack={() => setStep("request")}
        />
      )}
      {step === "payment" && (
        <PaymentProcess rideData={rideData} onComplete={handlePaymentComplete} onBack={() => setStep("vehicle")} />
      )}
      {step === "tracking" && <RideTracking rideData={rideData} onNewRide={handleNewRide} />}
    </div>
  )
}
