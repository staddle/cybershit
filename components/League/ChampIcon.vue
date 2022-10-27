<template>
  <div>
    <img
      :src="require(`~/assets/img/champion/${champ.id}.png`)"
      :alt="`${champ.name} icon`"
      :width="width"
      :height="height"
      class="border border-slate-800"
      :class="{'grayscale': notPlayable, 'cursor-pointer hover:border-violet-600 transition-all duration-75': clickable}"
      @click.prevent="select()"
    >
  </div>
</template>

<script lang="ts" setup>

import { Champion } from '~/model/Champion'

export interface Props {
    champ: Champion,
    notPlayable?: boolean,
    width?: string,
    height?: string,
    clickable?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
    notPlayable: false,
    width: '50px',
    height: '50px',
    clickable: true
})

const { champ, notPlayable, width, height, clickable } = toRefs(props)

function select () {
  if (this.clickable) {
    if (this.notPlayable) {
      this.$emit('notify', 'You already played this champion previously or someone else picked it.')
    } else {
      this.$emit('select-champion')
    }
  }
}
</script>
