import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamSquad } from "@/components/team-squad"
import { TeamStats } from "@/components/team-stats"
import { TeamMatches } from "@/components/team-matches"
import { getTeamById } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function TeamPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the team data from an API
  const teamData = await getTeamById(params.id)

  if (!teamData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary/10 bg-white">
          <Image
            src={teamData.logo || "/placeholder.svg?height=96&width=96"}
            alt={teamData.name}
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight">{teamData.name}</h1>
          <p className="text-muted-foreground">{teamData.homeGround}</p>
        </div>
      </div>

      <Tabs defaultValue="squad" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="squad">Squad</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="squad">
          <TeamSquad teamId={params.id} />
        </TabsContent>

        <TabsContent value="matches">
          <TeamMatches teamId={params.id} />
        </TabsContent>

        <TabsContent value="stats">
          <TeamStats teamId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
