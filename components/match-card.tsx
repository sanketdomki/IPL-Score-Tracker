"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { Match } from "@/types/match"

interface MatchCardProps {
  match: Match
  className?: string
}

export function MatchCard({ match, className }: MatchCardProps) {
  const [score, setScore] = useState(match.score)

  // Simulate score updates for live matches
  useEffect(() => {
    if (match.status !== "live") return

    const interval = setInterval(() => {
      // In a real app, we would fetch the latest score from an API
      if (Math.random() > 0.7) {
        const newScore = {
          ...score,
          team1: {
            ...score.team1,
            runs: score.team1.runs + (Math.random() > 0.8 ? 4 : 1),
            wickets: Math.random() > 0.9 ? Math.min(score.team1.wickets + 1, 10) : score.team1.wickets,
          },
        }
        setScore(newScore)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [match.status, score])

  const getStatusBadge = () => {
    switch (match.status) {
      case "live":
        return (
          <Badge variant="destructive" className="animate-pulse">
            LIVE
          </Badge>
        )
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>
      default:
        return null
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="bg-muted p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{match.series}</h3>
            {getStatusBadge()}
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{new Date(match.date).toLocaleDateString()}</span>
            <MapPin className="ml-2 h-3 w-3" />
            <span>{match.venue}</span>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-sm">
                  <img
                    src={match.team1.logo || "/placeholder.svg?height=40&width=40"}
                    alt={match.team1.name}
                    className="h-full w-full object-contain p-0.5"
                  />
                </div>
                <span className="font-medium">{match.team1.name}</span>
              </div>
              {match.status !== "upcoming" && (
                <motion.div
                  key={`${score.team1.runs}-${score.team1.wickets}`}
                  initial={{ opacity: 0.6, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-right"
                >
                  <div className="font-semibold">
                    {score.team1.runs}/{score.team1.wickets}
                  </div>
                  <div className="text-xs text-muted-foreground">({score.team1.overs} ov)</div>
                </motion.div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-sm">
                  <img
                    src={match.team2.logo || "/placeholder.svg?height=40&width=40"}
                    alt={match.team2.name}
                    className="h-full w-full object-contain p-0.5"
                  />
                </div>
                <span className="font-medium">{match.team2.name}</span>
              </div>
              {match.status !== "upcoming" && (
                <div className="text-right">
                  <div className="font-semibold">
                    {score.team2.runs}/{score.team2.wickets}
                  </div>
                  <div className="text-xs text-muted-foreground">({score.team2.overs} ov)</div>
                </div>
              )}
            </div>
          </div>

          {match.status === "completed" && (
            <div className="mt-4 text-sm font-medium text-muted-foreground">{match.result}</div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/50 p-2">
        <Button asChild variant="ghost" size="sm" className="w-full">
          <Link href={`/matches/${match.id}`}>{match.status === "live" ? "Watch Live" : "View Details"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
