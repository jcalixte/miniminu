import { DateTime } from "luxon"

export interface TimeUntilReturn {
  years: number
  months: number
  days: number
  hours: number
  seconds: number
}

export const timeUntil = (target: string): TimeUntilReturn => {
  const now = DateTime.now()
  const dateTimeTarget = DateTime.fromISO(target)

  if (dateTimeTarget <= now) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      seconds: 0,
    }
  }

  const interval = dateTimeTarget
    .diff(now, ["years", "months", "days", "hours", "seconds"])
    .toObject()

  return {
    years: interval.years ? Math.round(interval.years) : 0,
    months: interval.months ? Math.round(interval.months) : 0,
    days: interval.days ? Math.round(interval.days) : 0,
    hours: interval.hours ? Math.round(interval.hours) : 0,
    seconds: interval.seconds ? Math.round(interval.seconds) : 0,
  }
}

export const hasPassed = (timeUntil: TimeUntilReturn): boolean =>
  Object.entries(timeUntil).every(([_, value]) => value === 0)
