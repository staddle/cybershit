<template>
  <div>
    <QuizQuestionMultipleChoiceQuestion v-if="isMultipleChoiceQuestion" :question="question" />
    <QuizQuestionTextQuestion v-if="isTextQuestion" :question="question" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MultipleChoiceQuestion } from '~/model/quiz/MultipleChoiceQuestion'
import { Question } from '~/model/quiz/Question'
import { TextQuestion } from '~/model/quiz/TextQuestion'

export default Vue.extend({
  name: 'QuestionComponent',
  props: {
    question: {
      type: Object as () => Question,
      required: true
    }
  },
  computed: {
    isMultipleChoiceQuestion (): boolean {
      return !!(this.question as MultipleChoiceQuestion).options
    },
    isTextQuestion (): boolean {
      return !!(this.question as TextQuestion).label
    }
  }
})
</script>
