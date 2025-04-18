"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchCard } from "@/components/match-card"
import { getTeamMatches } from "@/lib/api"
import type { Match } from "@/types/match"

interface TeamMatchesProps {
  teamId: string
}

export function TeamMatches({ teamId }: TeamMatchesProps) {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // In a real app, we would fetch the matches data from an API
        const data = await getTeamMatches(teamId)
        setMatches(data)
      } catch (error) {
        console.error("Failed to fetch matches:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [teamId])

  if (isLoading) {
    return <div>Loading matches...</div>
  }

  if (matches.length === 0) {
    return <div>No matches found</div>
  }

  const upcomingMatches = matches.filter((match) => match.status === "upcoming")
  const liveMatches = matches.filter((match) => match.status === "live")
  const completedMatches = matches.filter((match) => match.status === "completed")

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All Matches</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
          {completedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="upcoming" className="mt-4">
        {upcomingMatches.length === 0 ? (
          <div>No upcoming matches</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="completed" className="mt-4">
        {completedMatches.length === 0 ? (
          <div>No completed matches</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
