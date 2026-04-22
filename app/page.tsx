import Link from 'next/link'
import { ArrowRight, UserPlus, Search, MessageSquare, Users, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Footer } from '@/components/footer'
import { ChurchBadge } from '@/components/church-badge'
import { AvailabilityBadge } from '@/components/availability-badge'
import { candidates } from '@/lib/mock-data'

const featuredCandidates = candidates.filter((c) => c.availability !== 'not-looking').slice(0, 4)

const howItWorks = [
  {
    icon: UserPlus,
    title: 'Create Profile',
    description: 'Sign up and build your profile showcasing your skills, experience, and church community.',
  },
  {
    icon: Search,
    title: 'Get Discovered',
    description: 'Employers within the Advance family can search and find candidates who share their values.',
  },
  {
    icon: MessageSquare,
    title: 'Connect',
    description: 'Start conversations, share your CV, and explore opportunities that align with your calling.',
  },
]

export default function LandingPage() {
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
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 sm:py-28 lg:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                <span className="text-balance">Work that matters.</span>
                <br />
                <span className="text-accent">People who share your faith.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
                Connect with job seekers and employers within the Advance Movement family of churches across South Africa.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto">
                  <Link href="/signup">
                    Join the Network
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                  <Link href="/candidates">Browse Candidates</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">How It Works</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                A simple process to connect talented believers with meaningful opportunities.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {howItWorks.map((step, index) => (
                <Card key={step.title} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                        <step.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-accent">Step {index + 1}</span>
                        <h3 className="mt-1 font-serif text-xl font-semibold text-primary">{step.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Candidates */}
        <section className="bg-secondary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">Featured Candidates</h2>
                <p className="mt-2 text-muted-foreground">Talented professionals in the Advance family</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/candidates">
                  View All Candidates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredCandidates.map((candidate) => (
                <Card key={candidate.id} className="group transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20 rounded-xl">
                        <AvatarImage src={candidate.photo} alt={`${candidate.firstName} ${candidate.lastName}`} />
                        <AvatarFallback className="rounded-xl bg-accent/10 text-xl">
                          {candidate.firstName[0]}
                          {candidate.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="mt-4 font-serif text-lg font-semibold text-primary">
                        {candidate.firstName} {candidate.lastName}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{candidate.headline}</p>
                      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                        {candidate.skills.slice(0, 2).map((skill) => (
                          <span
                            key={skill.name}
                            className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <ChurchBadge churchName={candidate.homeChurch} size="sm" />
                      </div>
                      <div className="mt-3">
                        <AvailabilityBadge availability={candidate.availability} size="sm" />
                      </div>
                      <Button asChild className="mt-4 w-full" variant="outline" size="sm">
                        <Link href={`/profile/${candidate.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Employer Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-primary">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20">
                    <Briefcase className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="mt-6 font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
                    Find talent in the Advance family
                  </h2>
                  <p className="mt-4 text-lg text-primary-foreground/80">
                    As an employer, access a pool of skilled professionals who share your values and faith. Build your team with people who understand the mission.
                  </p>
                  <ul className="mt-8 space-y-4">
                    {[
                      'Search candidates by skills, location, and church',
                      'Direct messaging with potential hires',
                      'Church references for added trust',
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                          <svg className="h-3 w-3 text-accent-foreground" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                        </div>
                        <span className="text-primary-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/signup">
                        Start Hiring
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/50 p-12">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Users, label: '500+ Candidates', value: 'Growing daily' },
                        { icon: Briefcase, label: '120+ Employers', value: 'Across SA' },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-card/10 p-6 backdrop-blur">
                          <stat.icon className="h-8 w-8 text-accent" />
                          <p className="mt-4 text-2xl font-bold text-primary-foreground">{stat.label}</p>
                          <p className="mt-1 text-sm text-primary-foreground/70">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Ready to connect with your community?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Join Advance Network today and find opportunities that align with your faith and calling.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/candidates">Explore Candidates</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
