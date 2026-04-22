'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, ChevronRight, ChevronLeft, Check, Users, Briefcase, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { CHURCHES, MINISTRY_INVOLVEMENTS } from '@/lib/mock-data'

type Role = 'job-seeker' | 'employer' | 'both' | null

const steps = [
  { id: 'role', title: 'Role' },
  { id: 'account', title: 'Account' },
  { id: 'profile', title: 'Profile' },
  { id: 'church', title: 'Church' },
]

const roleOptions = [
  {
    id: 'job-seeker' as const,
    title: 'Job Seeker',
    description: 'Looking for opportunities in the Advance community',
    icon: User,
  },
  {
    id: 'employer' as const,
    title: 'Employer',
    description: 'Hiring talented believers for your team',
    icon: Briefcase,
  },
  {
    id: 'both' as const,
    title: 'Both',
    description: 'Seeking opportunities and hiring',
    icon: Users,
  },
]

const referenceRelationships = ['Elder', 'Pastor', 'Small Group Leader', 'Other']

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [role, setRole] = useState<Role>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMinistries, setSelectedMinistries] = useState<string[]>([])

  const handleMinistryToggle = (ministry: string) => {
    setSelectedMinistries((prev) =>
      prev.includes(ministry)
        ? prev.filter((m) => m !== ministry)
        : [...prev, ministry]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      // Simulate signup
      setTimeout(() => {
        window.location.href = '/profile/edit'
      }, 1000)
    }
  }

  const canProceed = () => {
    if (currentStep === 0) return role !== null
    return true
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <span className="font-serif text-lg font-bold text-primary-foreground">A</span>
            </div>
            <span className="font-serif text-xl font-semibold text-primary">Advance Network</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg">
          {/* Progress Indicator */}
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                      index < currentStep
                        ? 'bg-accent text-accent-foreground'
                        : index === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    )}
                  >
                    {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span
                    className={cn(
                      'ml-2 hidden text-sm font-medium sm:block',
                      index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground sm:mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">
              {currentStep === 0 && 'How will you use Advance Network?'}
              {currentStep === 1 && 'Create your account'}
              {currentStep === 2 && 'Tell us about yourself'}
              {currentStep === 3 && 'Your church community'}
            </CardTitle>
            <CardDescription>
              {currentStep === 0 && 'Select the option that best describes you'}
              {currentStep === 1 && 'Enter your account details'}
              {currentStep === 2 && 'Basic information for your profile'}
              {currentStep === 3 && 'Connect with your church family'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 0: Role Selection */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  {roleOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRole(option.id)}
                      className={cn(
                        'flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-colors',
                        role === option.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent/50'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                          role === option.id ? 'bg-accent text-accent-foreground' : 'bg-secondary'
                        )}
                      >
                        <option.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{option.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      {role === option.id && (
                        <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                          <Check className="h-4 w-4 text-accent-foreground" />
                        </div>
                      )}
                    </button>
                  ))}

                  {/* Google Sign In */}
                  <div className="pt-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Quick sign up</span>
                      </div>
                    </div>
                    <Button type="button" variant="outline" className="mt-4 w-full" disabled={!role}>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 1: Account Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Basic Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+27 82 123 4567"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {role === 'employer' || role === 'both' ? (
                    <div className="space-y-2">
                      <Label htmlFor="company">Company / Organization</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="company"
                          placeholder="Your company name"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Step 3: Church Association */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="homeChurch">Home Church</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your home church" />
                      </SelectTrigger>
                      <SelectContent>
                        {CHURCHES.map((church) => (
                          <SelectItem key={church} value={church}>
                            {church}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ministry Involvement</Label>
                    <p className="text-xs text-muted-foreground">Select all that apply</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {MINISTRY_INVOLVEMENTS.map((ministry) => (
                        <button
                          key={ministry}
                          type="button"
                          onClick={() => handleMinistryToggle(ministry)}
                          className={cn(
                            'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                            selectedMinistries.includes(ministry)
                              ? 'border-accent bg-accent text-accent-foreground'
                              : 'border-border bg-secondary hover:border-accent/50'
                          )}
                        >
                          {ministry}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 rounded-lg border border-border bg-secondary/50 p-4">
                    <div>
                      <h4 className="font-medium text-foreground">Church Reference</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Reference details stay private and are only shared with employers you approve.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="refName">Reference Name</Label>
                        <Input id="refName" placeholder="Elder John Smith" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="refEmail">Reference Email</Label>
                        <Input id="refEmail" type="email" placeholder="john@church.co.za" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="refPhone">Reference Phone</Label>
                        <Input id="refPhone" type="tel" placeholder="+27 82 123 4567" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="refRelationship">Relationship</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            {referenceRelationships.map((rel) => (
                              <SelectItem key={rel} value={rel}>
                                {rel}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!canProceed() || isLoading}
                >
                  {isLoading ? (
                    'Creating account...'
                  ) : currentStep === steps.length - 1 ? (
                    'Create Account'
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-accent hover:text-accent/80">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
