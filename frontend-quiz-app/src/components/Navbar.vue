<script setup>
import RoundedCheckbox from "@/components/buttons/RoundedCheckbox.vue";
import {useThemeStore} from "@/stores/theme.js";
import {useQuizStore} from "@/stores/quiz.js";
import {computed, watch} from "vue";
import {useRouter} from "vue-router";

const themeStore = useThemeStore();
const quizStore = useQuizStore();
const router = useRouter();

watch(
    () => router.currentRoute.value.path,
    (currentPath) => {
      if (!currentPath.startsWith('/quiz/')) {
        quizStore.setCurrentQuizName('');
        quizStore.setCurrentQuizIcon('');
      }
    }
);

const containerJustifyContent = computed(() => {
  return quizStore.currentQuizName !== '' ? 'space-between' : 'flex-end';
});

</script>

<template>
  <nav>
    <div class="container" :style="{justifyContent: containerJustifyContent }">
      <div v-if="quizStore.currentQuizName !== ''" class="quiz-header-container">
        <div class="quiz-icon" :style="{ 'background': `url(/src${quizStore.currentQuizIcon})` }"></div>
        <div class="quiz-title">{{ quizStore.currentQuizName }}</div>
      </div>
      <div class="theme-container">
        <img v-if="themeStore.isDark" src="../assets/images/icon-sun-light.svg" height="14" width="16" alt="sun-icon">
        <img v-else src="../assets/images/icon-sun-dark.svg" height="16" width="16" alt="sun-icon">
        <RoundedCheckbox/>
        <img v-if="themeStore.isDark" src="../assets/images/icon-moon-light.svg" height="16" width="16" alt="sun-icon">
        <img v-else src="../assets/images/icon-moon-dark.svg" height="16" width="16" alt="sun-icon">
      </div>
    </div>
  </nav>
</template>

<style scoped>
  nav {
    padding-bottom: var(--spacing-100);
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .theme-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-50);
  }

  .quiz-header-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-100);
  }

  .quiz-title {
    font-size: var(--font-size-110);
    color: var(--color-dark-navy);
    font-weight: var(--font-weight-semi-bold);
    line-height: 1;
  }

  .quiz-icon {
    display: inline-block;
    content: "";
    background-size: 40px;
    min-width: 40px;
    min-height: 40px;
  }
</style>