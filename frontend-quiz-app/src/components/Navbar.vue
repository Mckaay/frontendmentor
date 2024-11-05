<script setup>
import RoundedCheckbox from "@/components/buttons/RoundedCheckbox.vue";
import {useThemeStore} from "@/stores/theme.js";

const themeStore = useThemeStore();
</script>

<template>
  <nav>
    <div class="container">
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
    justify-content: flex-end;
  }

  .theme-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-50);
  }
</style>