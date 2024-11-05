<script setup>
import ItalicParagraph from "@/components/textComponents/ItalicParagraph.vue";
</script>

<template>
  <header class="quiz-header">
    <p class="intro-text">Welcome to the</p>
    <h1 class="quiz-title">Frontend Quiz!</h1>
    <ItalicParagraph text="Pick a subject to get started"/>
  </header>
</template>

<style scoped>
  .quiz-header {
    padding-top: var(--spacing-200);
  }

  .intro-text {
    font-size: var(--font-size-250);
    font-weight: var(--font-weight-light);
    line-height: 1;
    margin-bottom: var(--spacing-50);
  }

  .quiz-title {
    line-height: 1;
  }

</style>