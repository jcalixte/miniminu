<script setup lang="ts">
import { onUnmounted, ref } from "vue"
import { timeUntil } from "../services/time-until"

const props = defineProps<{ project?: string; target?: string }>()

const timeUntilTarget = props.target ? timeUntil(props.target) : null

const yearsUntil = ref(timeUntilTarget?.years ?? 0)
const monthsUntil = ref(timeUntilTarget?.months ?? 0)
const daysUntil = ref(timeUntilTarget?.days ?? 0)
const hoursUntil = ref(timeUntilTarget?.hours ?? 0)
const minutesUntil = ref(timeUntilTarget?.minutes ?? 0)
const secondsUntil = ref(timeUntilTarget?.seconds ?? 0)

const id = setInterval(() => {
  const timeUntilTarget = timeUntil("2024-03-13T09:00:00.000Z")

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
  <h1 v-if="props.project">{{ props.project }}</h1>
  <section v-if="timeUntilTarget">
    <div v-if="yearsUntil > 0" class="count">{{ yearsUntil }} years</div>
    <div v-if="monthsUntil > 0" class="count">{{ monthsUntil }} months</div>
    <div v-if="daysUntil > 0" class="count">{{ daysUntil }} days</div>
    <div v-if="hoursUntil > 0" class="count">{{ hoursUntil }} hours</div>
    <div v-if="minutesUntil > 0" class="count">{{ minutesUntil }} minutes</div>
    <div v-if="secondsUntil > 0" class="count">{{ secondsUntil }} seconds</div>
  </section>
  <section v-else>No target</section>
</template>

<style scoped>
section {
  display: flex;
}
</style>
