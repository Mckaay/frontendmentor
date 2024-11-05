import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref('light');

    function toggleTheme() {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    const isDark = computed(() => theme.value === 'dark');

    return { theme, toggleTheme, isDark }
    }
)