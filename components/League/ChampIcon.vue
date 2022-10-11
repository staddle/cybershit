<template>
  <div>
    <img
      :src="require(`~/assets/img/champion/${champ.id}.png`)"
      :alt="`${champ.name} icon`"
      :width="width"
      :height="height"
      :class="{'grayscale': notPlayable}"
      @click.prevent="$emit('select-champion', champ.id)"
      class="cursor-pointer hover:border hover:border-blue-600"
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
      required: false,
      default: false
    },
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    }
  }
})
</script>
