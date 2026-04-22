'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CandidateCard } from '@/components/candidate-card'
import { cn } from '@/lib/utils'
import { candidates, SA_PROVINCES, CHURCHES, SKILLS, type Availability } from '@/lib/mock-data'

const experienceLevels = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (3-5 years)' },
  { value: 'senior', label: 'Senior (6-10 years)' },
  { value: 'expert', label: 'Expert (10+ years)' },
]

const workTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
]

const availabilityOptions: { value: Availability | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open to work' },
  { value: 'passive', label: 'Open to opportunities' },
  { value: 'not-looking', label: 'Not looking' },
]

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string>('all')
  const [selectedChurch, setSelectedChurch] = useState<string>('all')
  const [selectedAvailability, setSelectedAvailability] = useState<Availability | 'all'>('all')
  const [selectedExperience, setSelectedExperience] = useState<string>('all')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(query)
        const matchesHeadline = candidate.headline.toLowerCase().includes(query)
        const matchesSkills = candidate.skills.some((s) => s.name.toLowerCase().includes(query))
        if (!matchesName && !matchesHeadline && !matchesSkills) return false
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        const hasAllSkills = selectedSkills.every((skill) =>
          candidate.skills.some((s) => s.name === skill)
        )
        if (!hasAllSkills) return false
      }

      // Province filter
      if (selectedProvince !== 'all' && candidate.province !== selectedProvince) {
        return false
      }

      // Church filter
      if (selectedChurch !== 'all' && candidate.homeChurch !== selectedChurch) {
        return false
      }

      // Availability filter
      if (selectedAvailability !== 'all' && candidate.availability !== selectedAvailability) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedSkills, selectedProvince, selectedChurch, selectedAvailability])

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedSkills([])
    setSelectedProvince('all')
    setSelectedChurch('all')
    setSelectedAvailability('all')
    setSelectedExperience('all')
  }

  const hasActiveFilters =
    searchQuery ||
    selectedSkills.length > 0 ||
    selectedProvince !== 'all' ||
    selectedChurch !== 'all' ||
    selectedAvailability !== 'all' ||
    selectedExperience !== 'all'

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Skills */}
      <div>
        <Label className="text-sm font-semibold">Skills</Label>
        <div className="mt-3 flex max-h-48 flex-wrap gap-2 overflow-y-auto">
          {SKILLS.slice(0, 20).map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handleSkillToggle(skill)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                selectedSkills.includes(skill)
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border hover:border-accent/50'
              )}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Province */}
      <div>
        <Label htmlFor="province" className="text-sm font-semibold">
          Province
        </Label>
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="All provinces" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All provinces</SelectItem>
            {SA_PROVINCES.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Church */}
      <div>
        <Label htmlFor="church" className="text-sm font-semibold">
          Home Church
        </Label>
        <Select value={selectedChurch} onValueChange={setSelectedChurch}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="All churches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All churches</SelectItem>
            {CHURCHES.map((church) => (
              <SelectItem key={church} value={church}>
                {church}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div>
        <Label htmlFor="availability" className="text-sm font-semibold">
          Availability
        </Label>
        <Select
          value={selectedAvailability}
          onValueChange={(v) => setSelectedAvailability(v as Availability | 'all')}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Work Type */}
      <div>
        <Label htmlFor="workType" className="text-sm font-semibold">
          Work Type
        </Label>
        <Select defaultValue="all">
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {workTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Experience Level */}
      <div>
        <Label htmlFor="experience" className="text-sm font-semibold">
          Experience Level
        </Label>
        <Select value={selectedExperience} onValueChange={setSelectedExperience}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            {experienceLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Browse Candidates
            </h1>
            <p className="mt-2 text-muted-foreground">
              Find talented professionals within the Advance family
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Desktop Filters */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 font-semibold text-foreground">Filters</h2>
                <FilterPanel />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Mobile Filter */}
              <div className="mb-6 flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, title, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                      {hasActiveFilters && (
                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                          !
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterPanel />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters Pills */}
              {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {selectedSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                    >
                      {skill}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  {selectedProvince !== 'all' && (
                    <button
                      onClick={() => setSelectedProvince('all')}
                      className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                    >
                      {selectedProvince}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  {selectedChurch !== 'all' && (
                    <button
                      onClick={() => setSelectedChurch('all')}
                      className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                    >
                      {selectedChurch}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  {selectedAvailability !== 'all' && (
                    <button
                      onClick={() => setSelectedAvailability('all')}
                      className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                    >
                      {availabilityOptions.find((o) => o.value === selectedAvailability)?.label}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Results Count */}
              <p className="mb-6 text-sm text-muted-foreground">
                Showing {filteredCandidates.length} of {candidates.length} candidates
              </p>

              {/* Candidate Grid */}
              {filteredCandidates.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                    No candidates found
                  </h3>
                  <p className="mt-2 max-w-sm text-center text-muted-foreground">
                    Try adjusting your filters or search query to find more candidates in the Advance
                    community.
                  </p>
                  <Button variant="outline" className="mt-6" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
