<script setup>
  import Header from "@/components/Header.vue";
  import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
  import QuizHeader from "@/components/quizComponents/QuizHeader.vue";
  import {useThemeStore} from "@/stores/theme.js";

  const themeStore = useThemeStore();
  const { score, totalQuestions, quizIcon, quizTitle } = defineProps(["score","totalQuestions","quizIcon","quizTitle"]);
</script>

<template>
  <div class="wrapper">
    <Header intro-text="Quiz completed" title="You scored..."/>
    <div class="result-wrapper" :class="{ dark: themeStore.isDark }">
      <QuizHeader :quizIcon="quizIcon" :quizTitle="quizTitle"/>
      <div class="score-wrapper">
        <div class="score">{{ score }}</div>
        <div class="max-score">out of {{ totalQuestions }}</div>
      </div>
    </div>
    <PrimaryButton text="Play Again"/>
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-75);
    padding-top: var(--spacing-50);
  }

  .result-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-100);
    padding: var(--spacing-200);
    background-color: var(--color-pure-white);
    border-radius: var(--border-radius-medium);
  }

  .result-wrapper.dark {
    background-color: var(--color-navy);
    color: var(--color-pure-white);

    .max-score {
      color: var(--color-light-bluish);
    }
  }

  .score-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-100);
    align-items: center;
  }

  .result-wrapper {
    margin-top: var(--spacing-175);
  }

  .score {
    font-size: var(--font-size-550);
    font-weight: var(--font-weight-semi-bold);
    line-height: 1;
  }

  .max-score {
    font-size: var(--font-size-110);
    font-weight: var(--font-weight-regular);
    color: var(--color-grey-navy);
    line-height: 1;
  }
</style>