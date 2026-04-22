'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  Upload,
  FileText,
  X,
  Plus,
  Trash2,
  Eye,
  Download,
  Camera,
  Save,
  GripVertical,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import { CHURCHES, MINISTRY_INVOLVEMENTS, SA_PROVINCES, SKILLS, candidates } from '@/lib/mock-data'

const visibilityOptions = [
  { value: 'public', label: 'Public', description: 'Visible to everyone' },
  { value: 'advance', label: 'Advance Members Only', description: 'Only visible to registered Advance members' },
  { value: 'hidden', label: 'Hidden', description: 'Your profile is not discoverable' },
]

const referenceRelationships = ['Elder', 'Pastor', 'Small Group Leader', 'Other']

// Use the first candidate as mock data for editing
const currentUser = candidates[0]

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [skillSearch, setSkillSearch] = useState('')
  const [userSkills, setUserSkills] = useState(currentUser.skills)
  const [selectedMinistries, setSelectedMinistries] = useState<string[]>(currentUser.ministryInvolvement)
  const [cvFile, setCvFile] = useState<{ name: string; size: string; date: string } | null>(
    currentUser.cvFileName
      ? { name: currentUser.cvFileName, size: currentUser.cvSize!, date: currentUser.cvUploadDate! }
      : null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredSkills = SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
      !userSkills.find((s) => s.name === skill)
  )

  const handleAddSkill = (skillName: string) => {
    setUserSkills([...userSkills, { name: skillName, proficiency: 50 }])
    setSkillSearch('')
  }

  const handleRemoveSkill = (skillName: string) => {
    setUserSkills(userSkills.filter((s) => s.name !== skillName))
  }

  const handleSkillProficiencyChange = (skillName: string, proficiency: number) => {
    setUserSkills(
      userSkills.map((s) =>
        s.name === skillName ? { ...s, proficiency } : s
      )
    )
  }

  const handleMinistryToggle = (ministry: string) => {
    setSelectedMinistries((prev) =>
      prev.includes(ministry)
        ? prev.filter((m) => m !== ministry)
        : [...prev, ministry]
    )
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    // Check file type
    if (!file.name.match(/\.(pdf|docx)$/i)) {
      alert('Please upload a PDF or DOCX file')
      return
    }
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }
    setCvFile({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      date: new Date().toISOString().split('T')[0],
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate save
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/profile/1'
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-primary">Edit Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Update your profile information and settings
            </p>
          </div>

          <div className="space-y-6">
            {/* Photo */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Profile Photo</CardTitle>
                <CardDescription>
                  Your profile photo helps employers and connections recognize you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 rounded-2xl">
                      <AvatarImage src={currentUser.photo} alt="Profile" />
                      <AvatarFallback className="rounded-2xl text-2xl">
                        {currentUser.firstName[0]}
                        {currentUser.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Upload Photo
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={currentUser.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={currentUser.lastName} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    placeholder="e.g., Senior Software Engineer & Tech Lead"
                    defaultValue={currentUser.headline}
                  />
                  <p className="text-xs text-muted-foreground">
                    A brief title that describes your role or expertise
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    rows={5}
                    defaultValue={currentUser.about}
                    placeholder="Tell employers about yourself, your experience, and what you're looking for..."
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue={currentUser.city} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Select defaultValue={currentUser.province}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {SA_PROVINCES.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={currentUser.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue={currentUser.phone} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Skills</CardTitle>
                <CardDescription>
                  Add your skills and set your proficiency level for each
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Skill Search */}
                <div className="relative">
                  <Input
                    placeholder="Search and add skills..."
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                  />
                  {skillSearch && filteredSkills.length > 0 && (
                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-border bg-card shadow-lg">
                      {filteredSkills.slice(0, 10).map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleAddSkill(skill)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-secondary"
                        >
                          <Plus className="h-4 w-4 text-accent" />
                          {skill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Current Skills */}
                <div className="space-y-3">
                  {userSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-4 rounded-lg border border-border bg-secondary/50 p-3"
                    >
                      <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                      <span className="min-w-[120px] text-sm font-medium">{skill.name}</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.proficiency}
                          onChange={(e) =>
                            handleSkillProficiencyChange(skill.name, parseInt(e.target.value))
                          }
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-accent"
                        />
                      </div>
                      <span className="w-12 text-right text-sm text-muted-foreground">
                        {skill.proficiency}%
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.name)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CV Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">CV / Resume</CardTitle>
                <CardDescription>
                  Upload your CV for employers to download (PDF or DOCX, max 5MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />

                {cvFile ? (
                  <div className="rounded-lg border border-border bg-secondary/50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{cvFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {cvFile.size} • Uploaded{' '}
                          {new Date(cvFile.date).toLocaleDateString('en-ZA', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Replace
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setCvFile(null)}
                      >
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors',
                      isDragging
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50 hover:bg-secondary/50'
                    )}
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">
                      Drag and drop your CV here, or click to browse
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      PDF or DOCX, max 5MB
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Church & Ministry */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Church & Ministry</CardTitle>
                <CardDescription>
                  Connect with your church community on Advance Network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="homeChurch">Home Church</Label>
                  <Select defaultValue={currentUser.homeChurch}>
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

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="refEmail">Reference Email</Label>
                        <Input id="refEmail" type="email" placeholder="john@church.co.za" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="refPhone">Reference Phone</Label>
                        <Input id="refPhone" type="tel" placeholder="+27 82 123 4567" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="refRelationship">Relationship to Reference</Label>
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
              </CardContent>
            </Card>

            {/* Visibility */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Profile Visibility</CardTitle>
                <CardDescription>
                  Control who can see your profile on Advance Network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visibilityOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 hover:bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <input
                        type="radio"
                        name="visibility"
                        value={option.value}
                        defaultChecked={option.value === 'public'}
                        className="h-4 w-4 accent-accent"
                      />
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 pb-8">
              <Button variant="outline" asChild>
                <Link href="/profile/1">Cancel</Link>
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  'Saving...'
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
