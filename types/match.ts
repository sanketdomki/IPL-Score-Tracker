export interface Team {
  id: string
  name: string
  logo?: string
}

export interface Score {
  runs: number
  wickets: number
  overs: number
}

export interface Match {
  id: string
  series: string
  date: string
  venue: string
  team1: Team
  team2: Team
  status: "live" | "completed" | "upcoming"
  result?: string
  toss?: string
  score: {
    team1: Score
    team2: Score
  }
}

export interface Batter {
  id: string
  name: string
  runs: number
  balls: number
  fours: number
  sixes: number
  dismissal: string
}

export interface Bowler {
  id: string
  name: string
  overs: number
  maidens: number
  runs: number
  wickets: number
}

export interface TeamScorecard {
  name: string
  batting: Batter[]
  bowling: Bowler[]
}

export interface Scorecard {
  team1: TeamScorecard
  team2: TeamScorecard
}

export interface Commentary {
  id: string
  over: number
  text: string
  timestamp: string
  isWicket: boolean
  isBoundary: boolean
}
