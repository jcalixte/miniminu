<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue"
import { timeUntil } from "../services/time-until"

const props = defineProps<{ project?: string; target?: string }>()

const targetDate = computed(() =>
  props.target
    ? new Date(props.target).toLocaleDateString(undefined, {
        dateStyle: "long",
      })
    : null
)

const timeUntilTarget = props.target ? timeUntil(props.target) : null

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
  if (!props.target) {
    return
  }
  const timeUntilTarget = timeUntil(props.target)

  yearsUntil.value = timeUntilTarget.years
  monthsUntil.value = timeUntilTarget.months
  daysUntil.value = timeUntilTarget.days
  hoursUntil.value = timeUntilTarget.hours
  minutesUntil.value = timeUntilTarget.minutes
  secondsUntil.value = timeUntilTarget.seconds
}, 1000)

onUnmounted(() => clearInterval(id))
</script>

<template>
  <div class="responsive-time-until">
    <h1 v-if="props.project">{{ props.project }}</h1>
    <section class="time" v-if="timeUntilTarget">
      <div v-if="isYearsDisplayed" class="count">
        <span class="number">{{ yearsUntil }}</span>
        <span class="moment">years</span>
      </div>
      <div v-if="isMonthsDisplayed" class="count">
        <span class="number">{{ monthsUntil }}</span>
        <span class="moment">months</span>
      </div>
      <div v-if="isDaysDisplayed" class="count">
        <span class="number">{{ daysUntil }}</span>
        <span class="moment">days</span>
      </div>
      <div v-if="isHoursDisplayed" class="count">
        <span class="number">{{ hoursUntil }}</span>
        <span class="moment">hours</span>
      </div>
      <div v-if="isMinutesDisplayed" class="count">
        <span class="number">{{ minutesUntil }}</span>
        <span class="moment">minutes</span>
      </div>
      <div v-if="isSecondsDisplayed" class="count">
        <span class="number">{{ secondsUntil }}</span>
        <span class="moment">seconds</span>
      </div>
    </section>
    <section v-else>No target</section>
    <section v-if="targetDate" class="target-date">{{ targetDate }}</section>
  </div>
</template>

<style scoped>
div.responsive-time-until {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
}
.time {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.count {
  display: flex;
  flex-direction: column;
}
.number {
  font-size: 36px;
}
.target-date {
  margin-bottom: 1rem;
}
</style>
