<script setup>
import {computed, defineProps, ref} from 'vue';
import { useThemeStore } from "@/stores/theme.js";

const { label, text, isCorrect, name, value, answeredState, modelValue } = defineProps(["label", "text", "isCorrect", "name","value", "answeredState" ,"modelValue"]);
const themeStore = useThemeStore();
const emit = defineEmits(['update:modelValue']);

const handleChange = (event) => {
  emit('update:modelValue', event.target.value);
};

const labelClasses = computed(() => {
  return {
    dark: themeStore.isDark,
    'picked-correct-answer': answeredState && isCorrect && modelValue == value,
    'picked-incorrect-answer': answeredState && !isCorrect && modelValue == value,
    'correct-answer': answeredState && isCorrect && modelValue != value,
  };
});
</script>

<template>
  <label :class="labelClasses">
    <input
        type="radio"
        :name="name"
        :value="value"
        class="radio-input"
        @change="handleChange"
        :disabled="answeredState"
        :checked="modelValue == value"
    />
    <div class="option">{{ label }}</div>
    <div class="text">{{ text }}</div>
  </label>
</template>

<style scoped>
  label {
    box-sizing: border-box;
    font-size: var(--font-size-110);
    font-weight: var(--font-weight-semi-bold);
    color: var(--color-dark-navy);
    border: 0;
    display: flex;
    gap: var(--spacing-100);
    align-items: center;
    cursor: pointer;
    padding: var(--spacing-75);
    line-height: 1;
    border-radius: var(--border-radius-medium);
    background-color: white;
    user-select: none;
  }

  label.dark {
    color: var(--color-pure-white);
    background-color: var(--color-navy);

    .text {
      color: var(--color-pure-white);
    }
  }

  label:hover .label {
    color: var(--color-purple);
    background-color: #F6E7FF;
  }

  .radio-input {
    display: none;
  }

  .option {
    display: grid;
    place-items: center;
    height: 40px;
    min-width: 40px;
    color: var(--color-grey-navy);
    background-color: var(--color-light-gray);
    width: 40px;
  }

  .text {
    font-size: var(--font-size-110);
    color: var(--color-dark-navy);
  }

  label:has(input:checked).picked-correct-answer {
    outline: 3px solid var(--color-green);

    .option {
      background-color: var(--color-green);
      color: var(--color-pure-white);
    }
  }

  label:has(input:checked) {
    outline: 3px solid var(--color-purple);

    .option {
      background-color: var(--color-purple);
      color: var(--color-pure-white);
    }
  }

  label.picked-correct-answer::after {
    display: block;
    content: "";
    background: url(../../assets/images/icon-correct.svg);
    background-size: 40px;
    min-width: 40px;
    min-height: 40px;
    justify-self: flex-end;
    margin-left: auto;
  }

  label.picked-incorrect-answer::after {
    display: block;
    content: "";
    background: url(../../assets/images/icon-incorrect.svg);
    background-size: 40px;
    min-width: 40px;
    min-height: 40px;
    justify-self: flex-end;
    margin-left: auto;
  }

  label:has(input:checked).picked-incorrect-answer {
    outline: 3px solid var(--color-red);

    .option {
      background-color: var(--color-red);
      color: var(--color-pure-white);
    }
  }

  label.correct-answer::after {
    display: block;
    content: "";
    background: url(../../assets/images/icon-correct.svg);
    background-size: 40px;
    min-width: 40px;
    min-height: 40px;
    justify-self: flex-end;
    margin-left: auto;
  }
</style>
