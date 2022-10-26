<template>
  <div>
    <QuizQuestionMultipleChoiceQuestion v-if="isMultipleChoiceQuestion()" :question="question" />
    <QuizQuestionTextQuestion v-if="isTextQuestion()" :question="question" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MultipleChoiceQuestion } from '~/model/quiz/MultipleChoiceQuestion';
import { Question } from '~/model/quiz/Question'
import { TextQuestion } from '~/model/quiz/TextQuestion';

export default Vue.extend({
  name: 'QuestionComponent',
  props: {
    question: Question
  },
  computed: {
    isMultipleChoiceQuestion (): boolean {
      return typeof this.question === typeof MultipleChoiceQuestion
    },
    isTextQuestion (): boolean {
      return typeof this.question === typeof TextQuestion
    }
  }
})
</script>
