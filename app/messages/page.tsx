'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  ChevronDown,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Navigation } from '@/components/navigation'
import { cn } from '@/lib/utils'
import { candidates, conversations, messages, messageTemplates } from '@/lib/mock-data'

interface ChatMessage {
  id: string
  senderId: string
  content: string
  timestamp: string
  isOwn: boolean
}

function MessagesContent() {
  const searchParams = useSearchParams()
  const toParam = searchParams.get('to')
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [showMobileChat, setShowMobileChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Find candidate for the selected conversation
  const selectedCandidate = selectedConversation
    ? candidates.find((c) => c.id === selectedConversation)
    : toParam
    ? candidates.find((c) => c.id === toParam)
    : null

  // Initialize with toParam if present
  useEffect(() => {
    if (toParam && !selectedConversation) {
      setSelectedConversation(toParam)
      setShowMobileChat(true)
    }
  }, [toParam, selectedConversation])

  // Load messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const conversationMessages = messages
        .filter(
          (m) =>
            (m.senderId === selectedConversation && m.receiverId === 'current-user') ||
            (m.senderId === 'current-user' && m.receiverId === selectedConversation)
        )
        .map((m) => ({
          ...m,
          isOwn: m.senderId === 'current-user',
        }))
      setChatMessages(conversationMessages)
    }
  }, [selectedConversation])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true,
    }

    setChatMessages([...chatMessages, newMsg])
    setNewMessage('')
  }

  const handleTemplateSelect = (template: string) => {
    const personalizedTemplate = selectedCandidate
      ? template.replace('[Name]', selectedCandidate.firstName)
      : template
    setNewMessage(personalizedTemplate)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-ZA', {
        day: 'numeric',
        month: 'short',
      })
    }
  }

  // Conversation list with candidate details
  const conversationList = conversations.map((conv) => {
    const otherParticipantId = conv.participantIds.find((id) => id !== 'current-user')
    const candidate = candidates.find((c) => c.id === otherParticipantId)
    return {
      ...conv,
      candidate,
    }
  })

  const filteredConversations = conversationList.filter((conv) => {
    if (!searchQuery) return true
    const name = `${conv.candidate?.firstName} ${conv.candidate?.lastName}`.toLowerCase()
    return name.includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex h-screen flex-col">
      <Navigation />

      <main className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <aside
          className={cn(
            'flex w-full flex-col border-r border-border bg-card md:w-80 lg:w-96',
            showMobileChat && 'hidden md:flex'
          )}
        >
          {/* Search */}
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversation(conv.candidate?.id || null)
                    setShowMobileChat(true)
                  }}
                  className={cn(
                    'flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-secondary',
                    selectedConversation === conv.candidate?.id && 'bg-secondary'
                  )}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conv.candidate?.photo} alt={conv.candidate?.firstName} />
                      <AvatarFallback>
                        {conv.candidate?.firstName?.[0]}
                        {conv.candidate?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online status dot */}
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate font-medium text-foreground">
                        {conv.candidate?.firstName} {conv.candidate?.lastName}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(conv.lastMessageTime)}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-medium text-accent-foreground">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <MessageSquare className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">No conversations yet</p>
              </div>
            )}
          </div>
        </aside>

        {/* Chat Area */}
        <div
          className={cn(
            'flex flex-1 flex-col bg-background',
            !showMobileChat && 'hidden md:flex'
          )}
        >
          {selectedCandidate ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setShowMobileChat(false)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedCandidate.photo} alt={selectedCandidate.firstName} />
                    <AvatarFallback>
                      {selectedCandidate.firstName[0]}
                      {selectedCandidate.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium text-foreground">
                      {selectedCandidate.firstName} {selectedCandidate.lastName}
                    </h2>
                    <p className="text-xs text-muted-foreground">{selectedCandidate.headline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mx-auto max-w-3xl space-y-4">
                  {chatMessages.length > 0 ? (
                    chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn('flex', message.isOwn ? 'justify-end' : 'justify-start')}
                      >
                        <div
                          className={cn(
                            'max-w-[70%] rounded-2xl px-4 py-2',
                            message.isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-foreground'
                          )}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p
                            className={cn(
                              'mt-1 text-right text-xs',
                              message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            )}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                        <MessageSquare className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="mt-4 text-center text-muted-foreground">
                        Start a conversation with {selectedCandidate.firstName}
                      </p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-border bg-card p-4">
                <div className="mx-auto max-w-3xl">
                  {/* Templates Dropdown */}
                  <div className="mb-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Message Templates
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-64">
                        {messageTemplates.map((template) => (
                          <DropdownMenuItem
                            key={template.id}
                            onClick={() => handleTemplateSelect(template.content)}
                          >
                            {template.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Input Area */}
                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="min-h-[44px] max-h-32 resize-none"
                      rows={1}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                <MessageSquare className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">
                Select a conversation
              </h2>
              <p className="mt-2 max-w-sm text-center text-muted-foreground">
                Choose a conversation from the list or start a new one by visiting a candidate&apos;s
                profile
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <MessagesContent />
    </Suspense>
  )
}
