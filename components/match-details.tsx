"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import type { Match } from "@/types/match"

interface MatchDetailsProps {
  match: Match
}

export function MatchDetails({ match }: MatchDetailsProps) {
  const [score, setScore] = useState(match.score)
  const [currentOver, setCurrentOver] = useState<number[]>([])

  // Simulate score updates for live matches
  useEffect(() => {
    if (match.status !== "live") return

    const interval = setInterval(() => {
      // In a real app, we would fetch the latest score from an API
      if (Math.random() > 0.7) {
        const runs = Math.random() > 0.8 ? 4 : Math.random() > 0.9 ? 6 : 1

        setCurrentOver((prev) => {
          const newOver = [...prev, runs]
          return newOver.length > 6 ? newOver.slice(-6) : newOver
        })

        const newScore = {
          ...score,
          team1: {
            ...score.team1,
            runs: score.team1.runs + runs,
            wickets: Math.random() > 0.9 ? Math.min(score.team1.wickets + 1, 10) : score.team1.wickets,
            overs: Number.parseFloat((Math.floor(score.team1.overs) + (currentOver.length + 1) / 10).toFixed(1)),
          },
        }
        setScore(newScore)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [match.status, score, currentOver])

  const getRunRate = (runs: number, overs: number) => {
    return overs > 0 ? (runs / overs).toFixed(2) : "0.00"
  }

  const getRequiredRunRate = () => {
    if (match.status !== "live" || score.team1.wickets === 10) return "0.00"

    const remainingRuns = score.team2.runs - score.team1.runs + 1
    const remainingOvers = 20 - score.team1.overs

    return remainingOvers > 0 ? (remainingRuns / remainingOvers).toFixed(2) : "0.00"
  }

  const getMatchProgress = () => {
    if (match.status === "upcoming") return 0
    if (match.status === "completed") return 100

    // Calculate based on overs played
    const totalOvers = 40 // 20 overs per innings
    const oversPlayed = score.team2.overs > 0 ? score.team1.overs + score.team2.overs : score.team1.overs

    return Math.min(Math.round((oversPlayed / totalOvers) * 100), 100)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{match.series}</h2>
          {match.status === "live" && (
            <Badge variant="destructive" className="animate-pulse">
              LIVE
            </Badge>
          )}
        </div>

        <div className="mb-6 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white shadow-sm">
                <img
                  src={match.team1.logo || "/placeholder.svg?height=64&width=64"}
                  alt={match.team1.name}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{match.team1.name}</h3>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${score.team1.runs}-${score.team1.wickets}`}
                    initial={{ opacity: 0.6, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold"
                  >
                    {score.team1.runs}/{score.team1.wickets}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">({score.team1.overs} ov)</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-right">{match.team2.name}</h3>
                <div className="text-2xl font-bold text-right">
                  {score.team2.runs}/{score.team2.wickets}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">({score.team2.overs} ov)</span>
                </div>
              </div>
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white shadow-sm">
                <img
                  src={match.team2.logo || "/placeholder.svg?height=64&width=64"}
                  alt={match.team2.name}
                  className="h-full w-full object-contain p-1"
                />
              </div>
            </div>
          </div>

          {match.status === "live" && (
            <div className="space-y-2 rounded-lg bg-muted p-4">
              <div className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">CRR:</span> {getRunRate(score.team1.runs, score.team1.overs)}
                </div>
                <div>
                  <span className="font-medium">RRR:</span> {getRequiredRunRate()}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Match Progress</span>
                  <span>{getMatchProgress()}%</span>
                </div>
                <Progress value={getMatchProgress()} className="h-2" />
              </div>

              <div className="mt-2">
                <div className="mb-1 text-xs font-medium">Current Over:</div>
                <div className="flex gap-1">
                  {currentOver.length === 0 ? (
                    <div className="text-xs text-muted-foreground">New over starting...</div>
                  ) : (
                    currentOver.map((runs, idx) => (
                      <div
                        key={idx}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium"
                      >
                        {runs}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {match.status === "completed" && (
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="font-medium">{match.result}</p>
            </div>
          )}

          {match.status === "upcoming" && (
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="font-medium">
                Match starts on {new Date(match.date).toLocaleDateString()} at{" "}
                {new Date(match.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-medium">Venue:</span>
            <span>{match.venue}</span>
          </div>
          {match.toss && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Toss:</span>
              <span>{match.toss}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
