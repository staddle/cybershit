<template>
  <button class="rounded-lg py-2 px-4 focus-visible:outline-none min-w-fit" :class="getColors(type)" :disabled="disabled" @click.prevent="clickButton()">
    <FontAwesomeIcon v-if="icon != ''" :icon="icon" /> {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ButtonComponent',
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickButton: function () {
      this.$emit('click')
    },
    getColors (type: string) {
      const classList : string[] = []
      classList.push('bg-' + type)
      classList.push('hover:bg-' + type + '-light')
      classList.push('active:bg-' + type + '-dark')
      if (type === 'primary' || type === 'tertiary2') {
        classList.push('text-white')
      }
      return classList
    }
  }
})
</script>
