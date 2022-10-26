<template>
  <div class="flex flex-col gap-4 w-fit mx-auto">
    <div class="flex flex-row gap-4">
      <h1 class="font-bold text-lg text-blue-600">{{ quiz.title }}</h1>
      <span class="text-slate-400 text-sm self-end">by {{ quiz.owner.username }}</span>
    </div>
    <hr class="border-blue-600">
    <div>
      <QuestionComponent v-for="question in quiz.questions" :key="question.id" :question="question" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QuestionComponent from './Question/QuestionComponent.vue'
import { Tools } from '~/model/Tools'

export default Vue.extend({
  components: { QuestionComponent },
  data () {
    return {
      quiz: Tools.getDefaultQuiz()
    }
  }
})
</script>

<style>

</style>
