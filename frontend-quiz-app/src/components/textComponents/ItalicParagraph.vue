<script setup>
  const props = defineProps(['text']);
</script>

<template>
  <p class="italic-paragraph">{{ props.text }}</p>
</template>

<style scoped>
  .italic-paragraph {
    font-size: var(--font-size-87);
    font-style: italic;
    color: var(--color-grey-navy);
    margin-top: var(--spacing-100);
  }
</style>