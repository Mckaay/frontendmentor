import { ref } from 'vue';
import { defineStore } from 'pinia';
import quizzesData from "../database/data.json";

export const useQuizStore = defineStore('quiz', () => {
    const quizzesArray = ref(quizzesData.quizzes);

    return { quizzesArray};
});
