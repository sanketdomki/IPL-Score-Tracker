import type { Match, Scorecard, Commentary } from "@/types/match"
import type { Player, TeamStats } from "@/types/team"

// Mock data for development
// In a real app, these would be API calls to a backend service

// Update the getMatches function to use the logo files
export async function getMatches(): Promise<Match[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      series: "IPL 2023",
      date: "2023-04-15T14:00:00Z",
      venue: "Wankhede Stadium, Mumbai",
      team1: {
        id: "mi",
        name: "Mumbai Indians",
        logo: "/logos/mi.png",
      },
      team2: {
        id: "csk",
        name: "Chennai Super Kings",
        logo: "/logos/csk.png",
      },
      status: "completed",
      result: "Mumbai Indians won by 5 wickets",
      toss: "Chennai Super Kings won the toss and elected to bat",
      score: {
        team1: { runs: 169, wickets: 8, overs: 20 },
        team2: { runs: 170, wickets: 5, overs: 19.2 },
      },
    },
    {
      id: "2",
      series: "IPL 2023",
      date: "2023-04-16T14:00:00Z",
      venue: "Eden Gardens, Kolkata",
      team1: {
        id: "kkr",
        name: "Kolkata Knight Riders",
        logo: "/logos/kkr.png",
      },
      team2: {
        id: "rcb",
        name: "Royal Challengers Bangalore",
        logo: "/logos/rcb.png",
      },
      status: "live",
      toss: "Kolkata Knight Riders won the toss and elected to bowl",
      score: {
        team1: { runs: 87, wickets: 3, overs: 10.2 },
        team2: { runs: 0, wickets: 0, overs: 0 },
      },
    },
    {
      id: "3",
      series: "IPL 2023",
      date: "2023-04-17T14:00:00Z",
      venue: "Arun Jaitley Stadium, Delhi",
      team1: {
        id: "dc",
        name: "Delhi Capitals",
        logo: "/logos/dc.png",
      },
      team2: {
        id: "rr",
        name: "Rajasthan Royals",
        logo: "/logos/rr.png",
      },
      status: "upcoming",
      score: {
        team1: { runs: 0, wickets: 0, overs: 0 },
        team2: { runs: 0, wickets: 0, overs: 0 },
      },
    },
    {
      id: "4",
      series: "IPL 2023",
      date: "2023-04-18T14:00:00Z",
      venue: "M. A. Chidambaram Stadium, Chennai",
      team1: {
        id: "csk",
        name: "Chennai Super Kings",
        logo: "/logos/csk.png",
      },
      team2: {
        id: "pbks",
        name: "Punjab Kings",
        logo: "/logos/pbks.png",
      },
      status: "upcoming",
      score: {
        team1: { runs: 0, wickets: 0, overs: 0 },
        team2: { runs: 0, wickets: 0, overs: 0 },
      },
    },
    {
      id: "5",
      series: "IPL 2023",
      date: "2023-04-14T14:00:00Z",
      venue: "Narendra Modi Stadium, Ahmedabad",
      team1: {
        id: "gt",
        name: "Gujarat Titans",
        logo: "/logos/gt.png",
      },
      team2: {
        id: "lsg",
        name: "Lucknow Super Giants",
        logo: "/logos/lsg.png",
      },
      status: "completed",
      result: "Gujarat Titans won by 7 wickets",
      toss: "Lucknow Super Giants won the toss and elected to bat",
      score: {
        team1: { runs: 135, wickets: 10, overs: 19.3 },
        team2: { runs: 136, wickets: 3, overs: 18.1 },
      },
    },
    {
      id: "6",
      series: "IPL 2023",
      date: "2023-04-13T14:00:00Z",
      venue: "Punjab Cricket Association Stadium, Mohali",
      team1: {
        id: "pbks",
        name: "Punjab Kings",
        logo: "/logos/pbks.png",
      },
      team2: {
        id: "srh",
        name: "Sunrisers Hyderabad",
        logo: "/logos/srh.png",
      },
      status: "completed",
      result: "Sunrisers Hyderabad won by 8 wickets",
      toss: "Punjab Kings won the toss and elected to bat",
      score: {
        team1: { runs: 143, wickets: 9, overs: 20 },
        team2: { runs: 145, wickets: 2, overs: 17.1 },
      },
    },
  ]
}

export async function getMatchById(id: string): Promise<Match | null> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  const matches = await getMatches()
  return matches.find((match) => match.id === id) || null
}

export async function getScorecard(matchId: string): Promise<Scorecard> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    team1: {
      name: "Mumbai Indians",
      batting: [
        { id: "1", name: "Rohit Sharma", runs: 43, balls: 32, fours: 4, sixes: 2, dismissal: "c Maxwell b Siraj" },
        { id: "2", name: "Ishan Kishan", runs: 32, balls: 21, fours: 3, sixes: 1, dismissal: "b Hazlewood" },
        { id: "3", name: "Suryakumar Yadav", runs: 68, balls: 39, fours: 5, sixes: 4, dismissal: "not out" },
        { id: "4", name: "Tilak Varma", runs: 22, balls: 16, fours: 1, sixes: 1, dismissal: "c Kohli b Siraj" },
        { id: "5", name: "Kieron Pollard", runs: 12, balls: 7, fours: 1, sixes: 1, dismissal: "run out" },
      ],
      bowling: [
        { id: "6", name: "Jasprit Bumrah", overs: 4, maidens: 0, runs: 21, wickets: 3 },
        { id: "7", name: "Trent Boult", overs: 4, maidens: 0, runs: 34, wickets: 1 },
        { id: "8", name: "Piyush Chawla", overs: 4, maidens: 0, runs: 38, wickets: 2 },
        { id: "9", name: "Krunal Pandya", overs: 4, maidens: 0, runs: 29, wickets: 1 },
        { id: "10", name: "Rahul Chahar", overs: 4, maidens: 0, runs: 43, wickets: 0 },
      ],
    },
    team2: {
      name: "Royal Challengers Bangalore",
      batting: [
        { id: "11", name: "Virat Kohli", runs: 51, balls: 42, fours: 3, sixes: 2, dismissal: "c Kishan b Bumrah" },
        { id: "12", name: "Faf du Plessis", runs: 38, balls: 28, fours: 4, sixes: 1, dismissal: "b Chawla" },
        { id: "13", name: "Glenn Maxwell", runs: 23, balls: 11, fours: 2, sixes: 2, dismissal: "c Pollard b Bumrah" },
        { id: "14", name: "Dinesh Karthik", runs: 30, balls: 18, fours: 3, sixes: 1, dismissal: "not out" },
        { id: "15", name: "Shahbaz Ahmed", runs: 12, balls: 8, fours: 1, sixes: 0, dismissal: "c Rohit b Bumrah" },
      ],
      bowling: [
        { id: "16", name: "Mohammed Siraj", overs: 4, maidens: 0, runs: 42, wickets: 2 },
        { id: "17", name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 23, wickets: 1 },
        { id: "18", name: "Harshal Patel", overs: 4, maidens: 0, runs: 43, wickets: 0 },
        { id: "19", name: "Wanindu Hasaranga", overs: 4, maidens: 0, runs: 32, wickets: 2 },
        { id: "20", name: "Shahbaz Ahmed", overs: 3, maidens: 0, runs: 28, wickets: 0 },
      ],
    },
  }
}

export async function getCommentary(matchId: string): Promise<Commentary[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 400))

  return [
    {
      id: "1",
      over: 10.2,
      text: "FOUR! Short and wide outside off, Suryakumar cuts it past point for a boundary.",
      timestamp: "2023-04-16T15:30:00Z",
      isWicket: false,
      isBoundary: true,
    },
    {
      id: "2",
      over: 10.1,
      text: "Full toss on the pads, flicked away to deep square leg for a single.",
      timestamp: "2023-04-16T15:29:30Z",
      isWicket: false,
      isBoundary: false,
    },
    {
      id: "3",
      over: 10.0,
      text: "End of the 10th over. Mumbai Indians are 86/3.",
      timestamp: "2023-04-16T15:29:00Z",
      isWicket: false,
      isBoundary: false,
    },
    {
      id: "4",
      over: 9.6,
      text: "Dot ball. Good length delivery outside off stump, defended back to the bowler.",
      timestamp: "2023-04-16T15:28:30Z",
      isWicket: false,
      isBoundary: false,
    },
    {
      id: "5",
      over: 9.5,
      text: "WICKET! Tilak Varma is caught at long-on. He tried to go big but didn't get enough power behind it.",
      timestamp: "2023-04-16T15:28:00Z",
      isWicket: true,
      isBoundary: false,
    },
    {
      id: "6",
      over: 9.4,
      text: "SIX! Massive hit over deep midwicket. Tilak Varma is looking in great touch today.",
      timestamp: "2023-04-16T15:27:30Z",
      isWicket: false,
      isBoundary: true,
    },
    {
      id: "7",
      over: 9.3,
      text: "Full and straight, driven down the ground for two runs.",
      timestamp: "2023-04-16T15:27:00Z",
      isWicket: false,
      isBoundary: false,
    },
    {
      id: "8",
      over: 9.2,
      text: "Short ball, pulled away to deep square leg for a single.",
      timestamp: "2023-04-16T15:26:30Z",
      isWicket: false,
      isBoundary: false,
    },
    {
      id: "9",
      over: 9.1,
      text: "Good length delivery on middle stump, defended back to the bowler.",
      timestamp: "2023-04-16T15:26:00Z",
      isWicket: false,
      isBoundary: false,
    },
    {
      id: "10",
      over: 9.0,
      text: "End of the 9th over. Mumbai Indians are 77/2.",
      timestamp: "2023-04-16T15:25:30Z",
      isWicket: false,
      isBoundary: false,
    },
  ]
}

// Update the getTeamById function to use the logo files
export async function getTeamById(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  const teams = {
    mi: {
      id: "mi",
      name: "Mumbai Indians",
      logo: "/logos/mi.png",
      homeGround: "Wankhede Stadium, Mumbai",
      owner: "Reliance Industries",
      coach: "Mark Boucher",
      captain: "Rohit Sharma",
    },
    csk: {
      id: "csk",
      name: "Chennai Super Kings",
      logo: "/logos/csk.png",
      homeGround: "M. A. Chidambaram Stadium, Chennai",
      owner: "India Cements",
      coach: "Stephen Fleming",
      captain: "MS Dhoni",
    },
    rcb: {
      id: "rcb",
      name: "Royal Challengers Bangalore",
      logo: "/logos/rcb.png",
      homeGround: "M. Chinnaswamy Stadium, Bangalore",
      owner: "United Spirits",
      coach: "Sanjay Bangar",
      captain: "Faf du Plessis",
    },
    kkr: {
      id: "kkr",
      name: "Kolkata Knight Riders",
      logo: "/logos/kkr.png",
      homeGround: "Eden Gardens, Kolkata",
      owner: "Red Chillies Entertainment",
      coach: "Chandrakant Pandit",
      captain: "Shreyas Iyer",
    },
    dc: {
      id: "dc",
      name: "Delhi Capitals",
      logo: "/logos/dc.png",
      homeGround: "Arun Jaitley Stadium, Delhi",
      owner: "JSW Group and GMR Group",
      coach: "Ricky Ponting",
      captain: "Rishabh Pant",
    },
    srh: {
      id: "srh",
      name: "Sunrisers Hyderabad",
      logo: "/logos/srh.png",
      homeGround: "Rajiv Gandhi International Cricket Stadium, Hyderabad",
      owner: "Sun TV Network",
      coach: "Brian Lara",
      captain: "Aiden Markram",
    },
    rr: {
      id: "rr",
      name: "Rajasthan Royals",
      logo: "/logos/rr.png",
      homeGround: "Sawai Mansingh Stadium, Jaipur",
      owner: "Manoj Badale",
      coach: "Kumar Sangakkara",
      captain: "Sanju Samson",
    },
    pbks: {
      id: "pbks",
      name: "Punjab Kings",
      logo: "/logos/pbks.png",
      homeGround: "Punjab Cricket Association Stadium, Mohali",
      owner: "Preity Zinta, Ness Wadia",
      coach: "Trevor Bayliss",
      captain: "Shikhar Dhawan",
    },
    gt: {
      id: "gt",
      name: "Gujarat Titans",
      logo: "/logos/gt.png",
      homeGround: "Narendra Modi Stadium, Ahmedabad",
      owner: "CVC Capital",
      coach: "Ashish Nehra",
      captain: "Hardik Pandya",
    },
    lsg: {
      id: "lsg",
      name: "Lucknow Super Giants",
      logo: "/logos/lsg.png",
      homeGround: "BRSABV Ekana Cricket Stadium, Lucknow",
      owner: "RPSG Group",
      coach: "Andy Flower",
      captain: "KL Rahul",
    },
  }

  return teams[id as keyof typeof teams] || null
}

export async function getTeamSquad(teamId: string): Promise<Player[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const squads = {
    mi: [
      {
        id: "1",
        name: "Rohit Sharma",
        role: "Batsman",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: true,
      },
      {
        id: "2",
        name: "Jasprit Bumrah",
        role: "Bowler",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "3",
        name: "Suryakumar Yadav",
        role: "Batsman",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "4",
        name: "Kieron Pollard",
        role: "All-rounder",
        country: "West Indies",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "5",
        name: "Ishan Kishan",
        role: "Wicket-keeper",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "6",
        name: "Hardik Pandya",
        role: "All-rounder",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "7",
        name: "Krunal Pandya",
        role: "All-rounder",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "8",
        name: "Trent Boult",
        role: "Bowler",
        country: "New Zealand",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "9",
        name: "Quinton de Kock",
        role: "Wicket-keeper",
        country: "South Africa",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
    ],
    csk: [
      {
        id: "10",
        name: "MS Dhoni",
        role: "Wicket-keeper",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: true,
      },
      {
        id: "11",
        name: "Ravindra Jadeja",
        role: "All-rounder",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "12",
        name: "Ruturaj Gaikwad",
        role: "Batsman",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "13",
        name: "Deepak Chahar",
        role: "Bowler",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "14",
        name: "Ambati Rayudu",
        role: "Batsman",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "15",
        name: "Dwayne Bravo",
        role: "All-rounder",
        country: "West Indies",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "16",
        name: "Moeen Ali",
        role: "All-rounder",
        country: "England",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "17",
        name: "Faf du Plessis",
        role: "Batsman",
        country: "South Africa",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
      {
        id: "18",
        name: "Shardul Thakur",
        role: "Bowler",
        country: "India",
        image: "/placeholder.svg?height=64&width=64",
        isCaptain: false,
      },
    ],
  }

  return squads[teamId as keyof typeof squads] || []
}

export async function getTeamStats(teamId: string): Promise<TeamStats> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 400))

  const stats = {
    mi: {
      matches: 234,
      wins: 129,
      losses: 105,
      titles: 5,
      titleYears: [2013, 2015, 2017, 2019, 2020],
      topBatsmen: [
        { id: "1", name: "Rohit Sharma", runs: 4982, average: 31.32, strikeRate: 130.62 },
        { id: "2", name: "Kieron Pollard", runs: 3412, average: 28.67, strikeRate: 147.32 },
        { id: "3", name: "Suryakumar Yadav", runs: 1726, average: 33.19, strikeRate: 143.43 },
      ],
      topBowlers: [
        { id: "4", name: "Jasprit Bumrah", wickets: 130, average: 23.35, economy: 7.42 },
        { id: "5", name: "Lasith Malinga", wickets: 170, average: 19.8, economy: 7.14 },
        { id: "6", name: "Krunal Pandya", wickets: 61, average: 31.25, economy: 7.86 },
      ],
    },
    csk: {
      matches: 213,
      wins: 121,
      losses: 92,
      titles: 4,
      titleYears: [2010, 2011, 2018, 2021],
      topBatsmen: [
        { id: "7", name: "MS Dhoni", runs: 4746, average: 39.55, strikeRate: 137.85 },
        { id: "8", name: "Suresh Raina", runs: 5528, average: 32.52, strikeRate: 136.73 },
        { id: "9", name: "Faf du Plessis", runs: 2932, average: 35.45, strikeRate: 131.08 },
      ],
      topBowlers: [
        { id: "10", name: "Dwayne Bravo", wickets: 154, average: 24.34, economy: 8.25 },
        { id: "11", name: "Ravindra Jadeja", wickets: 132, average: 27.65, economy: 7.58 },
        { id: "12", name: "Deepak Chahar", wickets: 59, average: 29.19, economy: 7.8 },
      ],
    },
  }

  return (
    stats[teamId as keyof typeof stats] || {
      matches: 0,
      wins: 0,
      losses: 0,
      titles: 0,
      titleYears: [],
      topBatsmen: [],
      topBowlers: [],
    }
  )
}

export async function getTeamMatches(teamId: string): Promise<Match[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 400))

  const matches = await getMatches()
  return matches.filter((match) => match.team1.id === teamId || match.team2.id === teamId)
}

// Update the getPointsTable function to use the logo files
export async function getPointsTable() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    {
      id: "gt",
      name: "Gujarat Titans",
      logo: "/logos/gt.png",
      played: 14,
      won: 10,
      lost: 4,
      noResult: 0,
      points: 20,
      netRunRate: 0.809,
    },
    {
      id: "csk",
      name: "Chennai Super Kings",
      logo: "/logos/csk.png",
      played: 14,
      won: 8,
      lost: 5,
      noResult: 1,
      points: 17,
      netRunRate: 0.652,
    },
    {
      id: "lsg",
      name: "Lucknow Super Giants",
      logo: "/logos/lsg.png",
      played: 14,
      won: 8,
      lost: 6,
      noResult: 0,
      points: 16,
      netRunRate: 0.284,
    },
    {
      id: "mi",
      name: "Mumbai Indians",
      logo: "/logos/mi.png",
      played: 14,
      won: 8,
      lost: 6,
      noResult: 0,
      points: 16,
      netRunRate: -0.044,
    },
    {
      id: "rcb",
      name: "Royal Challengers Bangalore",
      logo: "/logos/rcb.png",
      played: 14,
      won: 7,
      lost: 7,
      noResult: 0,
      points: 14,
      netRunRate: 0.18,
    },
    {
      id: "rr",
      name: "Rajasthan Royals",
      logo: "/logos/rr.png",
      played: 14,
      won: 7,
      lost: 7,
      noResult: 0,
      points: 14,
      netRunRate: -0.147,
    },
    {
      id: "kkr",
      name: "Kolkata Knight Riders",
      logo: "/logos/kkr.png",
      played: 14,
      won: 6,
      lost: 8,
      noResult: 0,
      points: 12,
      netRunRate: 0.146,
    },
    {
      id: "pbks",
      name: "Punjab Kings",
      logo: "/logos/pbks.png",
      played: 14,
      won: 6,
      lost: 8,
      noResult: 0,
      points: 12,
      netRunRate: -0.304,
    },
    {
      id: "dc",
      name: "Delhi Capitals",
      logo: "/logos/dc.png",
      played: 14,
      won: 5,
      lost: 9,
      noResult: 0,
      points: 10,
      netRunRate: -0.572,
    },
    {
      id: "srh",
      name: "Sunrisers Hyderabad",
      logo: "/logos/srh.png",
      played: 14,
      won: 4,
      lost: 10,
      noResult: 0,
      points: 8,
      netRunRate: -0.59,
    },
  ]
}

// Add the getAllTeams function
export async function getAllTeams() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    {
      id: "mi",
      name: "Mumbai Indians",
      logo: "/logos/mi.png",
      homeGround: "Wankhede Stadium, Mumbai",
    },
    {
      id: "csk",
      name: "Chennai Super Kings",
      logo: "/logos/csk.png",
      homeGround: "M. A. Chidambaram Stadium, Chennai",
    },
    {
      id: "rcb",
      name: "Royal Challengers Bangalore",
      logo: "/logos/rcb.png",
      homeGround: "M. Chinnaswamy Stadium, Bangalore",
    },
    {
      id: "kkr",
      name: "Kolkata Knight Riders",
      logo: "/logos/kkr.png",
      homeGround: "Eden Gardens, Kolkata",
    },
    {
      id: "dc",
      name: "Delhi Capitals",
      logo: "/logos/dc.png",
      homeGround: "Arun Jaitley Stadium, Delhi",
    },
    {
      id: "srh",
      name: "Sunrisers Hyderabad",
      logo: "/logos/srh.png",
      homeGround: "Rajiv Gandhi International Cricket Stadium, Hyderabad",
    },
    {
      id: "rr",
      name: "Rajasthan Royals",
      logo: "/logos/rr.png",
      homeGround: "Sawai Mansingh Stadium, Jaipur",
    },
    {
      id: "pbks",
      name: "Punjab Kings",
      logo: "/logos/pbks.png",
      homeGround: "Punjab Cricket Association Stadium, Mohali",
    },
    {
      id: "gt",
      name: "Gujarat Titans",
      logo: "/logos/gt.png",
      homeGround: "Narendra Modi Stadium, Ahmedabad",
    },
    {
      id: "lsg",
      name: "Lucknow Super Giants",
      logo: "/logos/lsg.png",
      homeGround: "BRSABV Ekana Cricket Stadium, Lucknow",
    },
  ]
}
