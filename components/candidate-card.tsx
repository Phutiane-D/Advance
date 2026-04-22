import Link from 'next/link'
import { MapPin, MessageSquare } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AvailabilityBadge } from '@/components/availability-badge'
import { ChurchBadge } from '@/components/church-badge'
import type { Candidate } from '@/lib/mock-data'

interface CandidateCardProps {
  candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const topSkills = candidate.skills.slice(0, 3)

  return (
    <Card className="group transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 rounded-xl">
              <AvatarImage src={candidate.photo} alt={`${candidate.firstName} ${candidate.lastName}`} />
              <AvatarFallback className="rounded-xl bg-secondary text-lg">
                {candidate.firstName[0]}
                {candidate.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-serif text-lg font-semibold text-primary">
                {candidate.firstName} {candidate.lastName}
              </h3>
              <p className="truncate text-sm text-muted-foreground">{candidate.headline}</p>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {candidate.city}, {candidate.province}
                </span>
              </div>
            </div>
          </div>

          {/* Church Badge */}
          <ChurchBadge churchName={candidate.homeChurch} size="sm" />

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <span
                key={skill.name}
                className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
              >
                {skill.name}
              </span>
            ))}
            {candidate.skills.length > 3 && (
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                +{candidate.skills.length - 3} more
              </span>
            )}
          </div>

          {/* Availability */}
          <AvailabilityBadge availability={candidate.availability} size="sm" />

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/profile/${candidate.id}`}>View Profile</Link>
            </Button>
            <Button asChild size="icon" variant="ghost">
              <Link href={`/messages?to=${candidate.id}`}>
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Message {candidate.firstName}</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
