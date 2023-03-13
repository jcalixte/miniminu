import { describe, it, expect, vi, afterEach, beforeEach } from "vitest"
import { hasPassed, timeUntil } from "./time-until"

const noTime = () => ({
  days: 0,
  hours: 0,
  months: 0,
  seconds: 0,
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
      seconds: 0,
    })
  })

  it("tells the time until a more complex target date", () => {
    const fakeNow = new Date("2023-03-13T09:00:00.000Z")
    vi.setSystemTime(fakeNow)

    expect(timeUntil("2024-02-12T19:34:22.200Z")).toStrictEqual({
      days: 30,
      hours: 10,
      months: 10,
      seconds: 2062,
      years: 0,
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
    expect(hasPassed(noTime())).toBeTruthy()
    expect(
      hasPassed({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        seconds: 1,
      })
    ).toBeFalsy()
  })
})
