<template>
  <ComponentButtonStandard class="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white" :disabled="disabled" :text="text" @click="$emit('click')" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PrimaryButton',
  props: {
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>
