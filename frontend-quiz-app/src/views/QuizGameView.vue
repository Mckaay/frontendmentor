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

const route = useRoute()
const quizStore = useQuizStore();
const id = parseInt(route.params.id);
const currentQuestionIndex = ref(0);
const selectedAnswerIndex = ref(null);
const submittedAnswer = ref(false);
const isCorrect = ref(false);
const score = ref(0);
const questionCounter = ref(1);
const errorState = ref(false);
const showResult = ref(false);

const currentQuiz = computed(() => {
  return quizStore.quizzesArray.find((quiz) => {
    return quiz.id === parseInt(id);
  })
});

onMounted(() => {
  quizStore.setCurrentQuizName(currentQuiz.value.title);
  quizStore.setCurrentQuizIcon(currentQuiz.value.icon);
})

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

const totalQuestions = computed(() => {
  return currentQuizQuestions.value.length;
})

const submit = () => {
  if (selectedAnswerIndex.value === null) {
    errorState.value = true;
    return;
  }

  submittedAnswer.value = true;

  if (selectedAnswerIndex.value === correctAnswerIndex.value) {
    isCorrect.value = true;
    score.value++;
  }
}

const selectAnswer = (index) => {
  errorState.value = false;
  if (submittedAnswer.value) {
    return;
  }

  selectedAnswerIndex.value = index;
}

const goToNextQuestion = () => {
  submittedAnswer.value = false;
  isCorrect.value = false;
  selectedAnswerIndex.value = null;
  currentQuestionIndex.value++;
  questionCounter.value++;
}

</script>

<template>
  <div class="flex-wrapper">
    <div class="question-wrapper">
      <ItalicParagraph :text="`Question ${questionCounter} of ${totalQuestions}`"/>
      <QuizQuestion :text="currentDisplayedQuestion"/>
      <ProgressBar :width="(questionCounter / totalQuestions) * 100"/>
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
      <ErrorMessage v-if="errorState" message="Please select an answer"/>
    </div>
  </div>
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