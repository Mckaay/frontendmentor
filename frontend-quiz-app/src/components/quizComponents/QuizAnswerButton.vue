<script setup>
  import {useThemeStore} from "@/stores/theme.js";

  const props = defineProps(['label','text'])
  const themeStore = useThemeStore();
</script>

<template>
  <button :class="{ dark: themeStore.isDark }">
    <div class="label">{{ props.label }}</div>
    <div class="text"> {{ props.text }}</div>
  </button>
</template>

<style scoped>
  button {
    box-sizing: border-box;
    font-size: var(--font-size-110);
    font-weight: var(--font-weight-semi-bold);
    color: var(--color-dark-navy);
    border: 0;
    display: flex;
    height: min-content;
    gap: var(--spacing-100);
    align-items: center;
    background-color: white;
    padding: var(--spacing-75);
    line-height: 1;
    border-radius: var(--border-radius-medium);
    cursor: pointer;
  }

  button.dark {
    color: var(--color-pure-white);
    background-color: var(--color-navy);
  }

  button:hover {
    .label {
      color: var(--color-purple);
      background-color: #F6E7FF;
    }
  }

  .label {
    display: grid;
    place-items: center;
    height: 40px;
    min-width: 40px;
    color: var(--color-grey-navy);
    background-color: var(--color-light-gray);
  }

  button.selected {
    outline: 3px solid var(--color-purple);

    .label {
      background-color: var(--color-purple);
      color: var(--color-pure-white);
    }
  }

  button.correct-answer::after {
    display: inline-block;
    content: "";
    background: url(../../assets/images/icon-correct.svg);
    background-size: 40px;
    min-width: 40px;
    min-height: 40px;
  }

  button.picked-correct-answer {
    outline: 3px solid var(--color-green);

    .label {
      background-color: var(--color-green);
      color: var(--color-pure-white);
    }
  }

  button.picked-correct-answer::after {
    display: inline-block;
    content: "";
    background: url(../../assets/images/icon-correct.svg);
    background-size: 40px;
    min-width: 40px;
    min-height: 40px;
  }

  button.picked-incorrect-answer {
    outline: 3px solid var(--color-red);

    .label {
      background-color: var(--color-red);
      color: var(--color-pure-white);
    }
  }
</style>