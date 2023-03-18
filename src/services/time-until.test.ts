import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { hasTimePassed, timeUntil } from "./time-until"

const noTime = () => ({
  days: 0,
  hours: 0,
  months: 0,
  seconds: 0,
  minutes: 0,
  years: 0,
})

describe("time until", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("tells the time until a simple target date", () => {
    const fakeNow = new Date("2023-03-13T09:00:00.000Z")
    vi.setSystemTime(fakeNow)

    expect(timeUntil("2024-03-13T09:00:00.000Z")).toStrictEqual({
      years: 1,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  })

  it("tells the time until a more complex target date", () => {
    const fakeNow = new Date("2023-03-13T09:00:00.000Z")
    vi.setSystemTime(fakeNow)

    expect(timeUntil("2024-02-12T19:34:22.200Z")).toStrictEqual({
      years: 0,
      months: 10,
      days: 30,
      hours: 10,
      minutes: 34,
      seconds: 22,
    })
  })

  it("tells 0 if the target date is passed", () => {
    const fakeNow = new Date("2023-03-13T09:00:00.000Z")
    vi.setSystemTime(fakeNow)

    expect(timeUntil("2022-03-13T09:00:00.000Z")).toStrictEqual(noTime())
  })
})

describe("has passed", () => {
  it("tells if the targed has passed", () => {
    expect(hasTimePassed(noTime())).toBeTruthy()
    expect(
      hasTimePassed({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 1,
      })
    ).toBeFalsy()
  })
})
