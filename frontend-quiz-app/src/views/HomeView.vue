<script setup>
import Header from "@/components/Header.vue";
import QuizSelectionList from "@/components/quizComponents/QuizSelectionList.vue";
</script>

<template>
  <div class="grid-container">
    <Header/>
    <main>
      <QuizSelectionList/>
    </main>
  </div>
</template>

<style scoped>
  .grid-container {
    display: grid;
    gap: var(--spacing-250);
  }
</style>