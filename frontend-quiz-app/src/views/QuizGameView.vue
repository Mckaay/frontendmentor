<script setup>
import {useRoute} from "vue-router";
import {useQuizStore} from "@/stores/quiz.js";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import ItalicParagraph from "@/components/textComponents/ItalicParagraph.vue";
import QuizQuestion from "@/components/quizComponents/QuizQuestion.vue";
import QuizAnswerButton from "@/components/quizComponents/QuizAnswerButton.vue";

const route = useRoute()
const quizStore = useQuizStore();
const id = parseInt(route.params.id);
const currentQuestionIndex = ref(0);
const selectedAnswerIndex = ref(null);
const submittedAnswer = ref(false);
const isCorrect = ref(false);
const score = ref(0);

const currentQuiz = computed(() => {
  return quizStore.quizzesArray.find((quiz) => {
    return quiz.id === parseInt(id);
  })
});

const currentQuizQuestions = computed(() => {
  return currentQuiz.value ? currentQuiz.value.questions : [];
});

const currentDisplayedQuestion = computed (() => {
  return currentQuizQuestions.value[currentQuestionIndex.value].question;
})

const currentDisplayedQuestionAnswers = computed (() => {
  return currentQuizQuestions.value[currentQuestionIndex.value].options;
})

const correctAnswerIndex = computed(() => {
  return currentDisplayedQuestionAnswers.value.findIndex((element) => {
    return element === currentQuizQuestions.value[currentQuestionIndex.value].answer;
  });
});

const submit = () => {
  submittedAnswer.value = true;

  if (selectedAnswerIndex.value === correctAnswerIndex.value) {
    isCorrect.value = true;
    score.value++;
  }
}

const selectAnswer = (index) => {
  if (submittedAnswer.value) {
    return;
  }

  selectedAnswerIndex.value = index;
}

const goToNextQuesition = () => {

}

</script>

<template>
  <div class="flex-wrapper">
    <div class="question-wrapper">
      <ItalicParagraph text="Question 1 of 10"/>
      <QuizQuestion :text="currentDisplayedQuestion"/>
      <div class="progress-bar"></div>
    </div>
    <div class="answers-wrapper">
      <QuizAnswerButton @click="selectAnswer(index)"
                        :class=
                            "{ selected: !submittedAnswer && index === selectedAnswerIndex,
                            'picked-correct-answer': submittedAnswer && isCorrect && index === correctAnswerIndex,
                            'picked-incorrect-answer': submittedAnswer && !isCorrect && index === selectedAnswerIndex,
                            'correct-answer': submittedAnswer && !isCorrect && index === correctAnswerIndex
      }"
                        v-for="(answer, index) in currentDisplayedQuestionAnswers" :key="index" :label="String.fromCharCode(65 + index)"
                        :text="answer"/>
      <PrimaryButton v-if="!submittedAnswer" @click="submit" text="Submit Answer"/>
      <PrimaryButton v-else @click="goToNextQuestion" text="Next Question"/>
    </div>
  </div>
</template>

<style scoped>
  .question-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-75);
  }

  .progress-bar {
    margin-top: var(--spacing-75);
    position: relative;
    width: 100%;
    height: 16px;
    background-color: var(--color-pure-white);
    border-radius: var(--border-radius-medium);
  }

  .progress-bar::before {
    position: absolute;
    content: "";
    width: calc(100% - 8px);
    height: 8px;
    border-radius: var(--border-radius-small);
    left: 4px;
    background-color: var(--color-purple);
    transform: translateY(50%);
  }

  .answers-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-75);
    padding-top: var(--spacing-250);
  }
</style>