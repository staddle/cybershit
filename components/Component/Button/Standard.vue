<template>
  <button class="rounded-lg py-2 px-4 focus-visible:outline-none" :disabled="disabled" @click.prevent="clickButton()">
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'StandardButton',
  props: {
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickButton: function () {
      this.$emit('click')
    }
  }
})
</script>
