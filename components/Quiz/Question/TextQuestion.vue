<template>
  <div class="flex flex-col">
    <div class="flex flex-row gap-4">
      <label v-if="question.label" class="" :for="`text-question-${question.id}`">{{ question.label }}</label>
      <textarea :id="`text-question-${question.id}`" v-model="answer" class="border border-blue-600 flex-grow rounded-md p-2" />
    </div>
    <div class="flex flex-row gap-4 mt-2">
      <ComponentButton type="primary" class="flex-1" text="Submit" @click="submit()" />
      <ComponentButton type="secondary" class="flex-1" text="Skip" @click="skip()" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TextQuestion } from '~/model/quiz/TextQuestion'

export default Vue.extend({
  name: 'TextQuestion',
  props: {
    question: {
      type: Object as () => TextQuestion,
      required: true
    }
  },
  data: () => ({
    answer: ''
  }),
  watch: {
    answer: function (newAnswer) {
      if (this.validate(newAnswer)) {
        this.$emit('answer', newAnswer)
      }
    }
  },
  mounted: function () {
    this.answer = this.preText()
  },
  methods: {
    validate: function (answer: string) : boolean {
      return true
    },
    preText: function () : string {
      return this.question.preText ?? ''
    },
    submit: function () {
      this.$emit('submit')
    },
    skip: function () {
      this.$emit('skip')
    }
  }
})
</script>
