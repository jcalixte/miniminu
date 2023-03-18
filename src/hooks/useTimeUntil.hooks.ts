import { ref, computed, onUnmounted, ComputedRef } from "vue"
import { hasTimePassed, timeUntil } from "../services/time-until"

export const useTimeUntil = (target: ComputedRef<string | undefined>) => {
  const timeUntilTarget = target.value ? timeUntil(target.value) : null
  const hasTargetPassed = timeUntilTarget
    ? hasTimePassed(timeUntilTarget)
    : false

  const yearsUntil = ref(timeUntilTarget?.years ?? 0)
  const monthsUntil = ref(timeUntilTarget?.months ?? 0)
  const daysUntil = ref(timeUntilTarget?.days ?? 0)
  const hoursUntil = ref(timeUntilTarget?.hours ?? 0)
  const minutesUntil = ref(timeUntilTarget?.minutes ?? 0)
  const secondsUntil = ref(timeUntilTarget?.seconds ?? 0)

  const isYearsDisplayed = computed(() => yearsUntil.value > 0)
  const isMonthsDisplayed = computed(
    () => isYearsDisplayed.value || monthsUntil.value > 0
  )
  const isDaysDisplayed = computed(
    () => isMonthsDisplayed.value || daysUntil.value > 0
  )
  const isHoursDisplayed = computed(
    () => isDaysDisplayed.value || hoursUntil.value > 0
  )
  const isMinutesDisplayed = computed(
    () => isHoursDisplayed.value || minutesUntil.value > 0
  )
  const isSecondsDisplayed = computed(
    () => isMinutesDisplayed.value || secondsUntil.value > 0
  )

  const id = setInterval(() => {
    if (!target.value) {
      return
    }
    const timeUntilTarget = timeUntil(target.value)

    yearsUntil.value = timeUntilTarget.years
    monthsUntil.value = timeUntilTarget.months
    daysUntil.value = timeUntilTarget.days
    hoursUntil.value = timeUntilTarget.hours
    minutesUntil.value = timeUntilTarget.minutes
    secondsUntil.value = timeUntilTarget.seconds
  }, 1000)

  onUnmounted(() => clearInterval(id))

  return {
    timeUntilTarget,
    hasTargetPassed,
    isYearsDisplayed,
    isMonthsDisplayed,
    isDaysDisplayed,
    isHoursDisplayed,
    isMinutesDisplayed,
    isSecondsDisplayed,
    yearsUntil,
    monthsUntil,
    daysUntil,
    hoursUntil,
    minutesUntil,
    secondsUntil,
  }
}
