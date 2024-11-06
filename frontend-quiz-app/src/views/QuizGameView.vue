<script setup>
import {useRoute} from "vue-router";
import {useQuizStore} from "@/stores/quiz.js";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import ItalicParagraph from "@/components/textComponents/ItalicParagraph.vue";
import QuizQuestion from "@/components/quizComponents/QuizQuestion.vue";
import QuizAnswerButton from "@/components/quizComponents/QuizAnswerButton.vue";
import ProgressBar from "@/components/quizComponents/ProgressBar.vue";
import ErrorMessage from "@/components/formComponents/ErrorMessage.vue";
import Quiz from "@/services/quizService.js";
import Result from "@/components/quizComponents/Result.vue";

const route = useRoute()
const quizStore = useQuizStore();
const quizData = quizStore.quizzesArray.find((quiz) => quiz.id === parseInt(route.params.id));
const quiz = ref(new Quiz(quizData));

const answeredState = ref(false);
const errorState = ref(false);
const selectedOption = ref(null);
const showResult = ref(false);

const progressBarWidth = computed(() => {
  return ((quiz.value.questionIndex + 1) / quiz.value.totalQuestions) * 100;
});

quizStore.setCurrentQuizIcon(quiz.value.quizIcon);
quizStore.setCurrentQuizName(quiz.value.quizTitle);

const submitAnswer = () => {
  if (selectedOption.value === null) {
    errorState.value = true;
    return;
  }

  answeredState.value = true;

  if (quiz.value.checkAnswerByIndex(selectedOption.value)) {
    quiz.value.incrementScore();
  }
}

const goToNextQuestion = () => {
  quiz.value.incrementQuestionIndex();

  if (quiz.value.checkIfQuizShouldEnd()) {
    showResult.value = true;
  }

  answeredState.value = false;
  selectedOption.value = null;
}

console.log(quiz.value.quizIcon);
console.log(quiz.value.quizTitle);

</script>

<template>
  <div v-if="!showResult" class="flex-wrapper">
    <div class="question-wrapper">
      <ItalicParagraph :text="`Question ${quiz.questionIndex + 1} of ${quiz.totalQuestions}`"/>
      <QuizQuestion :text="quiz.currentQuestion" />
      <ProgressBar :width="progressBarWidth"/>
    </div>
    <div class="answers-wrapper">
      <QuizAnswerButton
                        v-for="(option, index) in quiz.currentOptions"
                        :key="index"
                        :label="String.fromCharCode(65 + index)"
                        :text="option" :isCorrect="quiz.checkAnswer(option)"
                        :name="'question-' + quiz.questionIndex"
                        :value="index"
                        :answeredState="answeredState"
                        v-model="selectedOption"
                        />
      <PrimaryButton @click="goToNextQuestion" v-if="answeredState" text="Next Question"/>
      <PrimaryButton @click="submitAnswer" v-else text="Submit Answer"/>
      <ErrorMessage v-if="errorState" message="Please select an answer"/>
    </div>
  </div>
  <Result :score="quiz.score"
          :totalQuestions="quiz.totalQuestions"
          :quizIcon="quiz.quizIcon"
          :quizTitle="quiz.quizTitle"
          v-else/>
</template>

<style scoped>
  .question-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-75);
  }

  .answers-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-75);
    padding-top: var(--spacing-250);
  }
</style>