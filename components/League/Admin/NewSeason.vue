<template>
  <div>
    <div class="grid grid-flow-row gap-2">
      <div class="flex flex-row">
        <label for="name" class="mr-2 my-auto">Name: </label>
        <input id="name" v-model="name" class="bg-slate-700 px-2 py-1 rounded-md focus-visible:outline-teal-600 focus-visible:outline-1 focus-visible:outline">
      </div>
      <button v-if="season == null" class="rounded-md bg-violet-800 text-white py-2 px-4 mt-4 hover:bg-violet-700 active:bg-violet-900" @click.prevent="submit">
        Create New
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Participant, Season } from '~/model/Season'

export interface Props {
  season?: Season,
  seasonsLength: number,
}

const props = withDefaults(defineProps<Props>(), {
  season: null,
})

const { season, seasonsLength } = toRefs(props)

const name = ref(season.value?.name ?? '')
const participants = ref<Participant[]>([])

watch(season, (newVal) => {
  name.value = newVal?.name ?? ''
})

if (season.value) {
  name.value = season.value.name
}

const emit = defineEmits<{
  (e: 'season-created', s: Season): void,
  (e: 'update', s: Season): void,
}>()

function submit () {
  emit('season-created', {
    name: name.value
  } as Season)
}

function update () {
  emit('update', {
    name: name.value,
    participants: participants.value
  } as Season)
}

function selectParticipant (p : Participant[]) {
  participants.value = p
}
</script>

<style>

</style>
