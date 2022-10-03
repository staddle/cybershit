<template>
  <div>
    <img :src="icon(champ.name)" :alt="alt(champ.name)" :width="width" :height="height">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { riotApi } from '~/model/RiotApi'
import { Champion } from '~/model/Champion'

export default Vue.extend({
  name: 'ChampIcon',
  props: {
    champ: {
      type: Object as () => Champion,
      required: true
    },
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    }
  },
  methods: {
    icon (name : string): string {
      return riotApi().getChampionImage(name)
    },
    alt (name : string): string {
      return `${name} icon`
    }
  }
})
</script>
