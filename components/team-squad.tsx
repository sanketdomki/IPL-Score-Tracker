"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getTeamSquad } from "@/lib/api"
import type { Player } from "@/types/team"

interface TeamSquadProps {
  teamId: string
}

export function TeamSquad({ teamId }: TeamSquadProps) {
  const [squad, setSquad] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSquad = async () => {
      try {
        // In a real app, we would fetch the squad data from an API
        const data = await getTeamSquad(teamId)
        setSquad(data)
      } catch (error) {
        console.error("Failed to fetch squad:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSquad()
  }, [teamId])

  if (isLoading) {
    return <div>Loading squad...</div>
  }

  if (squad.length === 0) {
    return <div>Squad not available</div>
  }

  // Group players by role
  const playersByRole = squad.reduce(
    (acc, player) => {
      if (!acc[player.role]) {
        acc[player.role] = []
      }
      acc[player.role].push(player)
      return acc
    },
    {} as Record<string, Player[]>,
  )

  return (
    <div className="space-y-6">
      {Object.entries(playersByRole).map(([role, players]) => (
        <div key={role}>
          <h3 className="mb-3 text-lg font-semibold">{role}s</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player) => (
              <Card key={player.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={player.image || "/placeholder.svg?height=64&width=64"} alt={player.name} />
                      <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{player.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{player.role}</Badge>
                        {player.isCaptain && <Badge variant="secondary">Captain</Badge>}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{player.country}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
