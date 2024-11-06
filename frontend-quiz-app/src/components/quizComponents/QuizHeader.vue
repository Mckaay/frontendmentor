<script setup>
  import {useThemeStore} from "@/stores/theme.js";

  const { quizIcon, quizTitle } = defineProps(["quizIcon","quizTitle"]);
  const themeStore = useThemeStore();
</script>

<template>
  <div class="quiz-data-wrapper" :class="{ dark: themeStore.isDark }">
    <div class="quiz-icon" :style="{ 'background': `url(../src${quizIcon})` }"></div>
    <div class="quiz-title">{{ quizTitle }}</div>
  </div>
</template>

<style scoped>
  .quiz-data-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-100);
    color: var(--color-dark-navy);
  }

  .quiz-data-wrapper.dark {
    color: var(--color-pure-white);
  }

  .quiz-icon {
    display: inline-block;
    content: "";
    background-size: 40px;
    min-width: 40px;
    min-height: 40px;
  }

  .quiz-title {
    font-size: var(--font-size-110);
    font-weight: var(--font-weight-semi-bold);
    line-height: 1;
  }
</style>