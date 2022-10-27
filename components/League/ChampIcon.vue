<template>
  <div>
    <img
      :width="width"
      :height="height"
      :src="getImageUrl(champ.id)"
      :alt="`${champ.name} icon`"
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
    width?: number,
    height?: number,
    notPlayable?: boolean,
    clickable?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
    width: 50,
    height: 50,
    notPlayable: false,
    clickable: true
})

const { notPlayable, clickable } = toRefs(props)

const emit = defineEmits<{
    (e: 'select-champion'): void,
    (e: 'notify', message: string): void
}>()

const getImageUrl = (id) => {
  return new URL(`../../assets/img/champion/${id}.png`, import.meta.url).href
}

function select () {
  if (clickable.value) {
    if (notPlayable.value) {
      emit('notify', 'You already played this champion previously or someone else picked it.')
    } else {
      emit('select-champion')
    }
  }
}
</script>
