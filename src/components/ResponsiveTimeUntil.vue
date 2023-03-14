<script setup lang="ts">
import { onUnmounted, ref } from "vue"
import { timeUntil } from "../services/time-until"

const timeUntilTarget = timeUntil("2024-03-13T09:00:00.000Z")

const yearsUntil = ref(timeUntilTarget.years)
const monthsUntil = ref(timeUntilTarget.months)
const daysUntil = ref(timeUntilTarget.days)
const hoursUntil = ref(timeUntilTarget.hours)
const secondsUntil = ref(timeUntilTarget.seconds)

const id = setInterval(() => {
  const timeUntilTarget = timeUntil("2024-03-13T09:00:00.000Z")

  yearsUntil.value = timeUntilTarget.years
  monthsUntil.value = timeUntilTarget.months
  daysUntil.value = timeUntilTarget.days
  hoursUntil.value = timeUntilTarget.hours
  secondsUntil.value = timeUntilTarget.seconds
}, 1000)

onUnmounted(() => clearInterval(id))
</script>

<template>
  <section>
    <div>{{ yearsUntil }} years</div>
    <div>{{ monthsUntil }} months</div>
    <div>{{ daysUntil }} days</div>
    <div>{{ hoursUntil }} hours</div>
    <div>{{ secondsUntil }} seconds</div>
  </section>
</template>

<style scoped>
section {
  display: flex;
}
</style>
