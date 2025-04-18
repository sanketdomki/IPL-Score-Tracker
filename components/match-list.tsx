"use client"

import { useMatches } from "@/context/matches-context"
import { MatchCard } from "@/components/match-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface MatchListProps {
  filter: "all" | "live" | "upcoming" | "completed"
}

export function MatchList({ filter }: MatchListProps) {
  const { matches, isLoading, error } = useMatches()

  if (isLoading) {
    return <p>Loading matches...</p>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load matches. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  const filteredMatches = filter === "all" ? matches : matches.filter((match) => match.status === filter)

  if (filteredMatches.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No matches found</AlertTitle>
        <AlertDescription>There are no {filter} matches at the moment.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredMatches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}
