"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getScorecard } from "@/lib/api"
import type { Scorecard as ScorecardType } from "@/types/match"

interface ScorecardProps {
  matchId: string
}

export function Scorecard({ matchId }: ScorecardProps) {
  const [scorecard, setScorecard] = useState<ScorecardType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchScorecard = async () => {
      try {
        // In a real app, we would fetch the scorecard data from an API
        const data = await getScorecard(matchId)
        setScorecard(data)
      } catch (error) {
        console.error("Failed to fetch scorecard:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchScorecard()
  }, [matchId])

  if (isLoading) {
    return <div>Loading scorecard...</div>
  }

  if (!scorecard) {
    return <div>Scorecard not available</div>
  }

  return (
    <Tabs defaultValue="team1">
      <TabsList>
        <TabsTrigger value="team1">{scorecard.team1.name}</TabsTrigger>
        <TabsTrigger value="team2">{scorecard.team2.name}</TabsTrigger>
      </TabsList>

      <TabsContent value="team1">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Batting</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batter</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead className="text-right">R</TableHead>
                  <TableHead className="text-right">B</TableHead>
                  <TableHead className="text-right">4s</TableHead>
                  <TableHead className="text-right">6s</TableHead>
                  <TableHead className="text-right">SR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecard.team1.batting.map((batter) => (
                  <TableRow key={batter.id}>
                    <TableCell className="font-medium">{batter.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{batter.dismissal}</TableCell>
                    <TableCell className="text-right">{batter.runs}</TableCell>
                    <TableCell className="text-right">{batter.balls}</TableCell>
                    <TableCell className="text-right">{batter.fours}</TableCell>
                    <TableCell className="text-right">{batter.sixes}</TableCell>
                    <TableCell className="text-right">
                      {batter.balls > 0 ? ((batter.runs / batter.balls) * 100).toFixed(2) : "0.00"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Bowling</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bowler</TableHead>
                  <TableHead className="text-right">O</TableHead>
                  <TableHead className="text-right">M</TableHead>
                  <TableHead className="text-right">R</TableHead>
                  <TableHead className="text-right">W</TableHead>
                  <TableHead className="text-right">Econ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecard.team2.bowling.map((bowler) => (
                  <TableRow key={bowler.id}>
                    <TableCell className="font-medium">{bowler.name}</TableCell>
                    <TableCell className="text-right">{bowler.overs}</TableCell>
                    <TableCell className="text-right">{bowler.maidens}</TableCell>
                    <TableCell className="text-right">{bowler.runs}</TableCell>
                    <TableCell className="text-right">{bowler.wickets}</TableCell>
                    <TableCell className="text-right">
                      {bowler.overs > 0 ? (bowler.runs / bowler.overs).toFixed(2) : "0.00"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="team2">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Batting</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batter</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead className="text-right">R</TableHead>
                  <TableHead className="text-right">B</TableHead>
                  <TableHead className="text-right">4s</TableHead>
                  <TableHead className="text-right">6s</TableHead>
                  <TableHead className="text-right">SR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecard.team2.batting.map((batter) => (
                  <TableRow key={batter.id}>
                    <TableCell className="font-medium">{batter.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{batter.dismissal}</TableCell>
                    <TableCell className="text-right">{batter.runs}</TableCell>
                    <TableCell className="text-right">{batter.balls}</TableCell>
                    <TableCell className="text-right">{batter.fours}</TableCell>
                    <TableCell className="text-right">{batter.sixes}</TableCell>
                    <TableCell className="text-right">
                      {batter.balls > 0 ? ((batter.runs / batter.balls) * 100).toFixed(2) : "0.00"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Bowling</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bowler</TableHead>
                  <TableHead className="text-right">O</TableHead>
                  <TableHead className="text-right">M</TableHead>
                  <TableHead className="text-right">R</TableHead>
                  <TableHead className="text-right">W</TableHead>
                  <TableHead className="text-right">Econ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecard.team1.bowling.map((bowler) => (
                  <TableRow key={bowler.id}>
                    <TableCell className="font-medium">{bowler.name}</TableCell>
                    <TableCell className="text-right">{bowler.overs}</TableCell>
                    <TableCell className="text-right">{bowler.maidens}</TableCell>
                    <TableCell className="text-right">{bowler.runs}</TableCell>
                    <TableCell className="text-right">{bowler.wickets}</TableCell>
                    <TableCell className="text-right">
                      {bowler.overs > 0 ? (bowler.runs / bowler.overs).toFixed(2) : "0.00"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
