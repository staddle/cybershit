<template>
  <ComponentButtonStandard class="bg-blue-100 hover:bg-sky-100 active:bg-blue-200" :disabled="disabled" :text="text" @click="$emit('click')" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SecondaryButton',
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
