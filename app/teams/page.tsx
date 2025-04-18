import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getAllTeams } from "@/lib/api"

export default async function TeamsPage() {
  // In a real app, we would fetch all teams from an API
  const teams = await getAllTeams()

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">IPL Teams</h1>
        <p className="text-muted-foreground">All teams participating in the Indian Premier League</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teams.map((team) => (
          <Link key={team.id} href={`/teams/${team.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-white shadow-sm">
                    <Image
                      src={team.logo || "/placeholder.svg?height=96&width=96"}
                      alt={team.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">{team.homeGround}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
