import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getPointsTable } from "@/lib/api"

export default async function PointsTablePage() {
  // In a real app, we would fetch the points table data from an API
  const pointsTableData = await getPointsTable()

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Points Table</h1>
        <p className="text-muted-foreground">Current standings for the IPL season</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>IPL 2023 Points Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">NR</TableHead>
                <TableHead className="text-center">Pts</TableHead>
                <TableHead className="text-right">NRR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pointsTableData.map((team, index) => (
                <TableRow key={team.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full bg-white shadow-sm">
                        <img
                          src={team.logo || "/placeholder.svg?height=24&width=24"}
                          alt={team.name}
                          className="h-full w-full object-contain p-0.5"
                        />
                      </div>
                      {team.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{team.played}</TableCell>
                  <TableCell className="text-center">{team.won}</TableCell>
                  <TableCell className="text-center">{team.lost}</TableCell>
                  <TableCell className="text-center">{team.noResult}</TableCell>
                  <TableCell className="text-center font-bold">{team.points}</TableCell>
                  <TableCell className="text-right">{team.netRunRate.toFixed(3)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
