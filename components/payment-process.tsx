"use client"

import type React from "react"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Wallet, Smartphone } from "lucide-react"
import {FormaSDK} from "@/lib/yuno"
import { getStyle, getStyleResponse } from "@/lib/index";
import Page from "@/lib/mockup";

interface PaymentProcessProps {
  rideData: {
    pickup: string
    destination: string
    vehicle: string
    price: number
  }
  onComplete: () => void
  onBack: () => void
}

type RenderProps = {
  getStyle: (options?: RequestInit) => Promise<getStyleResponse>;
};

export const FormSDK = {
  Render: ({ getStyle }: RenderProps) => {
    const [styles, setStyles] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadStyles = async () => {
        try {
          const response = await getStyle();
          setStyles(response.data);
        } catch (error) {
          console.error("Error cargando estilos", error);
        } finally {
          setLoading(false);
        }
      };

      loadStyles();
    }, [getStyle]);

    if (loading) return <p>Cargando estilos...</p>;

    return (
      <form style={styles?.form}>
        <input style={styles?.input} placeholder="Nombre" />
        <button style={styles?.button}>Pagar</button>
      </form>
    );
  }
};

export function PaymentProcess({ rideData, onComplete, onBack }: PaymentProcessProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [processing, setProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      onComplete()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} disabled={processing}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Confirm and pay</h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Payment Form */}
          <div className="lg:col-span-3">
            <Page />
          </div>
          {/* Ride Summary */}
          <div className="lg:col-span-2">
            <Card className="top-32 p-6">
              <h2 className="mb-4 text-xl font-bold">Ride summary</h2>

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
                  <p className="text-sm text-muted-foreground">Vehicle</p>
                  <p className="font-medium">{rideData.vehicle}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Base fare</span>
                    <span className="font-medium">${rideData.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Service fees</span>
                    <span className="font-medium">$2.50</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold">${(rideData.price + 2.5).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
