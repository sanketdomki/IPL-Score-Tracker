import { MatchList } from "@/components/match-list"
import { MatchFilters } from "@/components/match-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Suspense } from "react"
import { MatchListSkeleton } from "@/components/skeletons"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-8">
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">IPL Cricket Live</h1>
          <p className="text-muted-foreground">Live scores, match details and team information for IPL cricket</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Matches</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <MatchFilters className="mb-6" />

          <TabsContent value="all">
            <Suspense fallback={<MatchListSkeleton />}>
              <MatchList filter="all" />
            </Suspense>
          </TabsContent>

          <TabsContent value="live">
            <Suspense fallback={<MatchListSkeleton />}>
              <MatchList filter="live" />
            </Suspense>
          </TabsContent>

          <TabsContent value="upcoming">
            <Suspense fallback={<MatchListSkeleton />}>
              <MatchList filter="upcoming" />
            </Suspense>
          </TabsContent>

          <TabsContent value="completed">
            <Suspense fallback={<MatchListSkeleton />}>
              <MatchList filter="completed" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
