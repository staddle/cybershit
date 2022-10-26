<template>
  <div>
    <h1>{{ question.title }}</h1>
    <p>{{ question.description }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TextQuestion } from '~/model/quiz/TextQuestion'

export default Vue.extend({
  name: 'TextQuestion',
  props: {
    question: TextQuestion
  }
})
</script>
