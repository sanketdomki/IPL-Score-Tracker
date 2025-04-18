"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getMatches } from "@/lib/api"
import type { Match } from "@/types/match"

interface MatchesContextType {
  matches: Match[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined)

export function MatchesProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMatches = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getMatches()
      setMatches(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch matches"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()

    // Set up polling for live updates
    const interval = setInterval(() => {
      fetchMatches()
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <MatchesContext.Provider value={{ matches, isLoading, error, refetch: fetchMatches }}>
      {children}
    </MatchesContext.Provider>
  )
}

export function useMatches() {
  const context = useContext(MatchesContext)
  if (context === undefined) {
    throw new Error("useMatches must be used within a MatchesProvider")
  }
  return context
}
