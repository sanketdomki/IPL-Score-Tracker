"use client"

import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"
import { getCommentary } from "@/lib/api"
import type { Commentary } from "@/types/match"

interface LiveCommentaryProps {
  matchId: string
}

export function LiveCommentary({ matchId }: LiveCommentaryProps) {
  const [commentary, setCommentary] = useState<Commentary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [autoScroll, setAutoScroll] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCommentary = async () => {
      try {
        // In a real app, we would fetch the commentary data from an API
        const data = await getCommentary(matchId)
        setCommentary(data)
      } catch (error) {
        console.error("Failed to fetch commentary:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommentary()

    // Simulate live commentary updates
    const interval = setInterval(() => {
      setCommentary((prev) => {
        if (prev.length === 0) return prev

        // Generate a new commentary entry
        const lastEntry = prev[0]
        const newEntry = {
          id: `${Date.now()}`,
          over: lastEntry.over + 0.1,
          text: `${Math.random() > 0.8 ? "FOUR!" : Math.random() > 0.9 ? "SIX!" : "Dot ball."} ${Math.random() > 0.7 ? "Good length delivery outside off stump." : "Full toss on the pads."}`,
          timestamp: new Date().toISOString(),
          isWicket: Math.random() > 0.9,
          isBoundary: Math.random() > 0.7,
        }

        return [newEntry, ...prev]
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [matchId])

  // Auto-scroll to the latest commentary
  useEffect(() => {
    if (autoScroll && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0
    }
  }, [commentary, autoScroll])

  if (isLoading) {
    return <div>Loading commentary...</div>
  }

  if (commentary.length === 0) {
    return <div>Commentary not available</div>
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Commentary</h3>
        <Button variant="outline" size="sm" onClick={() => setAutoScroll(!autoScroll)}>
          {autoScroll ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Auto-scroll
            </>
          )}
        </Button>
      </div>

      <ScrollArea className="h-[400px]" ref={scrollAreaRef}>
        <div className="space-y-4 p-1">
          {commentary.map((entry) => (
            <div key={entry.id} className="space-y-1 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{entry.over.toFixed(1)}</Badge>
                  {entry.isWicket && <Badge variant="destructive">WICKET</Badge>}
                  {entry.isBoundary && <Badge variant="secondary">{entry.text.includes("SIX") ? "SIX" : "FOUR"}</Badge>}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm">{entry.text}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
