"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getTeamStats } from "@/lib/api"
import type { TeamStats as TeamStatsType } from "@/types/team"

interface TeamStatsProps {
  teamId: string
}

export function TeamStats({ teamId }: TeamStatsProps) {
  const [stats, setStats] = useState<TeamStatsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, we would fetch the stats data from an API
        const data = await getTeamStats(teamId)
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [teamId])

  if (isLoading) {
    return <div>Loading stats...</div>
  }

  if (!stats) {
    return <div>Stats not available</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 rounded-lg bg-muted p-3 text-center">
              <div className="text-sm text-muted-foreground">Matches</div>
              <div className="text-2xl font-bold">{stats.matches}</div>
            </div>
            <div className="space-y-1 rounded-lg bg-muted p-3 text-center">
              <div className="text-sm text-muted-foreground">Wins</div>
              <div className="text-2xl font-bold">{stats.wins}</div>
            </div>
            <div className="space-y-1 rounded-lg bg-muted p-3 text-center">
              <div className="text-sm text-muted-foreground">Losses</div>
              <div className="text-2xl font-bold">{stats.losses}</div>
            </div>
            <div className="space-y-1 rounded-lg bg-muted p-3 text-center">
              <div className="text-sm text-muted-foreground">Win %</div>
              <div className="text-2xl font-bold">{((stats.wins / stats.matches) * 100).toFixed(1)}%</div>
            </div>
          </div>

          <div className="mt-4 space-y-1 rounded-lg bg-muted p-3">
            <div className="text-sm text-muted-foreground">Titles</div>
            <div className="text-xl font-bold">{stats.titles}</div>
            <div className="text-xs text-muted-foreground">{stats.titleYears.join(", ")}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Top Run Scorers</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-right">Runs</TableHead>
                    <TableHead className="text-right">Avg</TableHead>
                    <TableHead className="text-right">SR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.topBatsmen.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell className="text-right">{player.runs}</TableCell>
                      <TableCell className="text-right">{player.average.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{player.strikeRate.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Top Wicket Takers</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-right">Wickets</TableHead>
                    <TableHead className="text-right">Avg</TableHead>
                    <TableHead className="text-right">Econ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.topBowlers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell className="text-right">{player.wickets}</TableCell>
                      <TableCell className="text-right">{player.average.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{player.economy.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
