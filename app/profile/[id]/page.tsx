import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin,
  MessageSquare,
  Download,
  FileText,
  Globe,
  Calendar,
  GraduationCap,
  Languages,
  Briefcase,
  Church,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AvailabilityBadge } from '@/components/availability-badge'
import { ChurchBadge } from '@/components/church-badge'
import { candidates } from '@/lib/mock-data'

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const candidate = candidates.find((c) => c.id === id)

  if (!candidate) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-primary">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <Avatar className="h-28 w-28 rounded-2xl border-4 border-primary-foreground/20 shadow-lg sm:h-32 sm:w-32">
                  <AvatarImage src={candidate.photo} alt={`${candidate.firstName} ${candidate.lastName}`} />
                  <AvatarFallback className="rounded-2xl bg-accent text-3xl font-bold text-accent-foreground">
                    {candidate.firstName[0]}
                    {candidate.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
                    {candidate.firstName} {candidate.lastName}
                  </h1>
                  <p className="mt-2 text-lg text-primary-foreground/80">{candidate.headline}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 text-primary-foreground/70">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {candidate.city}, {candidate.province}
                      </span>
                    </div>
                    <AvailabilityBadge availability={candidate.availability} />
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-3 sm:w-auto">
                <Button asChild className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 sm:flex-none">
                  <Link href={`/messages?to=${candidate.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Link>
                </Button>
                {candidate.cvFileName && (
                  <Button
                    variant="outline"
                    className="flex-1 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:flex-none"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-foreground">{candidate.about}</p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} className="mt-2 h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-6">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                            <Briefcase className="h-5 w-5 text-accent" />
                          </div>
                          {index < candidate.experience.length - 1 && (
                            <div className="mt-2 h-full w-px bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className="font-semibold text-foreground">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exp.company} • {exp.location}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(exp.startDate).toLocaleDateString('en-ZA', {
                              month: 'short',
                              year: 'numeric',
                            })}{' '}
                            -{' '}
                            {exp.endDate
                              ? new Date(exp.endDate).toLocaleDateString('en-ZA', {
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : 'Present'}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-foreground">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                          <GraduationCap className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{candidate.city}</p>
                      <p className="text-xs text-muted-foreground">{candidate.province}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Languages</p>
                      <p className="text-xs text-muted-foreground">{candidate.languages.join(', ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Church & Ministry */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Church & Ministry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Church className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Home Church</p>
                      <ChurchBadge churchName={candidate.homeChurch} size="sm" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ministry Involvement</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {candidate.ministryInvolvement.map((ministry) => (
                        <span
                          key={ministry}
                          className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {ministry}
                        </span>
                      ))}
                    </div>
                  </div>
                  {candidate.hasReference && (
                    <div className="flex items-center gap-2 rounded-lg bg-accent/10 p-3">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                      <p className="text-sm text-foreground">Reference available on request</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* CV */}
              {candidate.cvFileName && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">CV / Resume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                          <FileText className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{candidate.cvFileName}</p>
                          <p className="text-xs text-muted-foreground">
                            {candidate.cvSize} • Uploaded{' '}
                            {new Date(candidate.cvUploadDate!).toLocaleDateString('en-ZA', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Portfolio Links */}
              {candidate.portfolioLinks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Portfolio & Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {candidate.portfolioLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary"
                        >
                          <div className="flex items-center gap-3">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{link.label}</span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
