"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface MatchFiltersProps {
  className?: string
}

export function MatchFilters({ className }: MatchFiltersProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [venue, setVenue] = useState<string>("")
  const [team, setTeam] = useState<string>("")

  // In a real app, these would be fetched from an API
  const venues = ["Mumbai", "Chennai", "Kolkata", "Delhi", "Bangalore"]
  const teams = [
    "Mumbai Indians",
    "Chennai Super Kings",
    "Kolkata Knight Riders",
    "Delhi Capitals",
    "Royal Challengers Bangalore",
  ]

  const resetFilters = () => {
    setDate(undefined)
    setVenue("")
    setTeam("")
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1 border-dashed">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{date ? format(date, "PPP") : "Date"}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>

      <Select value={venue} onValueChange={setVenue}>
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue placeholder="Venue" />
        </SelectTrigger>
        <SelectContent>
          {venues.map((v) => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={team} onValueChange={setTeam}>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue placeholder="Team" />
        </SelectTrigger>
        <SelectContent>
          {teams.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(date || venue || team) && (
        <Button variant="ghost" size="sm" className="h-8" onClick={resetFilters}>
          Reset
        </Button>
      )}
    </div>
  )
}
