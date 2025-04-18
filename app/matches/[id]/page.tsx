import { Suspense } from "react"
import { notFound } from "next/navigation"
import { MatchDetails } from "@/components/match-details"
import { Scorecard } from "@/components/scorecard"
import { LiveCommentary } from "@/components/live-commentary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchDetailsSkeleton, ScoreboardSkeleton } from "@/components/skeletons"
import { getMatchById } from "@/lib/api"

export default async function MatchPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the match data from an API
  const matchData = await getMatchById(params.id)

  if (!matchData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={<MatchDetailsSkeleton />}>
        <MatchDetails match={matchData} />
      </Suspense>

      <Tabs defaultValue="scorecard" className="mt-6">
        <TabsList>
          <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
          <TabsTrigger value="commentary">Commentary</TabsTrigger>
          <TabsTrigger value="info">Match Info</TabsTrigger>
        </TabsList>

        <TabsContent value="scorecard" className="mt-4">
          <Suspense fallback={<ScoreboardSkeleton />}>
            <Scorecard matchId={params.id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="commentary" className="mt-4">
          <LiveCommentary matchId={params.id} />
        </TabsContent>

        <TabsContent value="info" className="mt-4">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-lg font-semibold">Match Information</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Venue:</span>
                <span className="col-span-2">{matchData.venue}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Date:</span>
                <span className="col-span-2">{new Date(matchData.date).toLocaleDateString()}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Toss:</span>
                <span className="col-span-2">{matchData.toss}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Umpires:</span>
                <span className="col-span-2">{matchData.umpires}</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
