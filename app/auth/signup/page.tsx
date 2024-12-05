"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { api } from "@/lib/api"
import Link from "next/link"

export default function SignUp() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'details' | 'verification'>('details')
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [errors, setErrors] = useState<{
    name?: string;
    emailIdS?: string;
    password?: string;
    aadhaar?: string;
    otp?: string;
  }>({})

  const validateDetails = (formData: FormData) => {
    const newErrors: typeof errors = {};
    
    // Name validation
    const name = formData.get("name") as string;
    if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    // Email validation
    const email = formData.get("email") as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.emailIdS = "Please enter a valid email address";
    }

    // Password validation
    const password = formData.get("password") as string;
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const validateAadhaar = () => {
    const newErrors: typeof errors = {};
    
    // Aadhaar validation (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber.replace(/\s/g, ''))) {
      newErrors.aadhaar = "Please enter a valid 12-digit Aadhaar number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const skipVerification = async () => {
    setLoading(true)
    try {
      toast({
        title: "Verification Skipped",
        description: "You can verify your Aadhaar later from the dashboard",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    
    const formData = new FormData(event.currentTarget)
    
    if (step === 'details') {
      if (!validateDetails(formData)) return
    } else {
      if (!validateAadhaar()) return
    }

    setLoading(true)

    try {
      if (step === 'details') {
        const response = await api.auth.signUp({
          name: formData.get("name") as string,
          emailId : formData.get("email") as string,
          password: formData.get("password") as string,
          organization: "",
          role: "USER",
          enabled: true,
          profileImg: "",
          gotra: "",
          dateOfBirth: "",
          gender: "",
          avatar: "",
          emailId2: "",
          emailId3: "",
          phoneNumber1: "",
          phoneNumber2: "",
          phoneNumber3: "",
        })
        
        setStep('verification')
      } else {
        await api.auth.verifyAadhaar(
          aadhaarNumber.replace(/\s/g, ''), 
          formData.get("otp") as string
        )
        toast({
          title: "Success",
          description: "Account created and verified successfully",
        })
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">
            {step === 'details' 
              ? "Enter your details to create an account"
              : "Verify your identity with Aadhaar"}
          </p>
        </div>

        {step === 'details' ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="john@example.com"
                required
                type="email"
              />
              {errors.emailIdS && (
                <p className="text-sm text-red-500">{errors.emailIdS}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                required
                type="password"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Continue"}
            </Button>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                placeholder="1234 5678 9012"
                required
              />
              {errors.aadhaar && (
                <p className="text-sm text-red-500">{errors.aadhaar}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                required
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Complete Registration"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2"
                onClick={skipVerification}
                disabled={loading}
              >
                Skip Verification
              </Button>
            </div>
          </form>
        )}

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  )
}