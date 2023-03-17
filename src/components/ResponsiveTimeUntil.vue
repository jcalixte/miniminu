<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue"
import { timeUntil } from "../services/time-until"
import { useTitle } from "@vueuse/core"

const props = defineProps<{ project?: string; target?: string }>()

if (props.project) {
  useTitle(props.project)
}

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

const projectTitle = ref(props.project)
const targetInput = ref(props.target)
const url = computed(() => {
  const newUrl = new URL(document.location.toString())
  if (projectTitle.value) {
    newUrl.searchParams.set("project", projectTitle.value)
  }
  if (targetInput.value) {
    newUrl.searchParams.set("target", targetInput.value)
  }

  return newUrl.toString()
})

const copyUrl = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url.value)
  }
}
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
    <section v-else>No target set.</section>
    <section v-if="targetDate" class="target-date">{{ targetDate }}</section>
    <form @submit.prevent>
      <section>
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="projectTitle" />
        </div>
        <div>
          <label for="target">Target date:</label>
          <input type="date" id="target" v-model="targetInput" />
        </div>
      </section>
      <div>
        <button @click="copyUrl">copy url</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
div.responsive-time-until {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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

form {
  display: none;
  padding: 1rem;
}

form section {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  max-width: 500px;
  margin: auto;
  padding: 1rem;
}

label {
  margin-right: 0.3rem;
}

input {
  padding: 0.5rem;
}

@media (min-width: 600px) {
  form {
    display: block;
  }
}
</style>
