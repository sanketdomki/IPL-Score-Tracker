export interface Player {
  id: string
  name: string
  role: string
  country: string
  image?: string
  isCaptain: boolean
}

export interface BatsmanStats {
  id: string
  name: string
  runs: number
  average: number
  strikeRate: number
}

export interface BowlerStats {
  id: string
  name: string
  wickets: number
  average: number
  economy: number
}

export interface TeamStats {
  matches: number
  wins: number
  losses: number
  titles: number
  titleYears: number[]
  topBatsmen: BatsmanStats[]
  topBowlers: BowlerStats[]
}
