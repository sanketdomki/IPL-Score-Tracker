import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function MatchListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-muted p-4">
              <Skeleton className="h-5 w-32" />
              <div className="mt-1 flex items-center gap-2">
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t bg-muted/50 p-2">
            <Skeleton className="h-9 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export function MatchDetailsSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-16" />
        </div>

        <div className="mb-6 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-32 w-full rounded-lg" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ScoreboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="space-y-6">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
