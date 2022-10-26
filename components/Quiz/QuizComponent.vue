<template>
  <div class="">
    <h1>{{ quiz.title }}</h1>
    <span>by {{ quiz.owner.username }}</span>
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
