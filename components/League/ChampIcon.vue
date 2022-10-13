<template>
  <div>
    <img
      :src="require(`~/assets/img/champion/${champ.id}.png`)"
      :alt="`${champ.name} icon`"
      :width="width"
      :height="height"
      :class="{'grayscale': notPlayable, 'cursor-pointer hover:border hover:border-blue-600': clickable}"
      @click.prevent="select()"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Champion } from '~/model/Champion'

export default Vue.extend({
  name: 'ChampIcon',
  props: {
    champ: {
      type: Object as () => Champion,
      required: true
    },
    notPlayable: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    select () {
      if (this.clickable) {
        if (this.notPlayable) {
          this.$emit('notify', 'You already selected this champion')
        } else {
          this.$emit('select-champion')
        }
      }
    }
  }
})
</script>
