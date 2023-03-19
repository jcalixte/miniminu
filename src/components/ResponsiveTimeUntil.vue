<script setup lang="ts">
import { computed, ref } from "vue"
import { useTitle } from "@vueuse/core"
import { useTimeUntil } from "../hooks/useTimeUntil.hooks"

const props = defineProps<{ project?: string; target?: string }>()

const target = computed(() => props.target)

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

const {
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
} = useTimeUntil(target)

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
    <section v-else class="no-target">No target set.</section>
    <section v-if="targetDate" class="target-date">
      <div v-if="hasTargetPassed" class="has-target-passed">🎊</div>
      <hr v-else />
      {{ targetDate }}
    </section>
    <form @submit.prevent>
      <div>
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          v-model="projectTitle"
          autocomplete="false"
        />
      </div>
      <div>
        <label for="target">Target date:</label>
        <input
          type="date"
          id="target"
          v-model="targetInput"
          autocomplete="false"
        />
      </div>
      <div>
        <button @click="copyUrl">copy url</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.responsive-time-until {
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

.no-target {
  padding: 1rem;
}

.has-target-passed {
  font-size: 72px;
}

form {
  display: none;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  flex-wrap: wrap;
}

label {
  margin-right: 0.3rem;
}

input {
  padding: 0.5rem;
}

@media (min-width: 600px) {
  form {
    display: flex;
  }
}
</style>
