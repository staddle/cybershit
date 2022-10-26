<template>
  <div class="flex flex-col">
    <div v-for="option in question.options" :key="option.id">
      <input
        :id="`multiple-choice-question-${question.id}-${option.id}`"
        v-model="answer"
        type="checkbox"
        :value="option.id"
      >
      <label :for="`multiple-choice-question-${question.id}-${option.id}`">
        {{ option.name }}
      </label>
    </div>
    <div class="flex flex-row gap-4 mt-2">
      <ComponentButton type="primary" class="flex-1" text="Submit" @click="submit()" />
      <ComponentButton type="secondary" class="flex-1" text="Skip" @click="skip()" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MultipleChoiceQuestion } from '~/model/quiz/MultipleChoiceQuestion'

export default Vue.extend({
  name: 'MultipleChoiceQuestion',
  props: {
    question: {
      type: Object as () => MultipleChoiceQuestion,
      required: true
    }
  },
  data: () => ({
    answer: []
  }),
  watch: {

  },
  mounted: function () {

  },
  methods: {

  }
})
</script>
