<template>
  <div class="flex flex-col justify-center align-middle">
    <h2 class="mb-2">
      Select Participants:
    </h2>
    <div class="grid grid-cols-3 grid-flow-row gap-2">
      <div v-for="p in availableParticipants" :key="p.id" class="flex">
        <input :id="p.id" v-model="participants" type="checkbox" :value="p.id" class="hidden p-check-box">
        <label :for="p.id" class="bg-slate-700 rounded-md py-2 px-2 border border-slate-700 hover:bg-slate-600 cursor-pointer w-full text-center">{{ p.name }}</label>
      </div>
      <button v-if="allowAddParticipants" class="rounded-md bg-violet-800 text-white py-2 px-2 hover:bg-violet-700 active:bg-violet-900" @click.prevent="addingParticipant = true">
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
    <div v-if="addingParticipant" class="fixed bg-black bg-opacity-40 top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div class="bg-slate-800 rounded-md border border-teal-600 h-fit py-4 relative px-4">
        <button class="absolute top-0 right-0 pr-2 pt-1 text-teal-400 hover:text-teal-600 w-6 h-6" @click.prevent="addingParticipant = false">
          <FontAwesomeIcon icon="xmark" />
        </button>
        <h1 class="text-lg">
          Add Participant for Season {{ season.name }}
        </h1>
        <hr class="border-teal-600 mt-1 mb-2">
        <div class="grid grid-flow-row gap-4">
          <div class="flex flex-row">
            <label for="name" class="my-auto mr-4">Name:</label>
            <input id="name" v-model="participantName" class="border border-teal-600 rounded-md bg-slate-700 py-1 px-2 focus-visible:outline-teal-600 focus-visible:outline-1 focus-visible:outline">
          </div>
          <button class="rounded-md bg-teal-600 text-white py-2 px-4" @click.prevent="pushParticipant(participantName)">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Participant, Season } from '~/model/Season'

export interface Props {
    season: Season,
    allowAddParticipants?: boolean,
    maxParticipants?: number,
      required: false,
}

const props = withDefaults(defineProps<Props>(), {
  allowAddParticipants: false,
  maxParticipants: 0,
})

const { season, allowAddParticipants, maxParticipants } = toRefs(props)

const availableParticipants = ref<Participant[]>([])
const participantName = ref('')
const addingParticipant = ref(false)
const participants = ref<string[]>([])

const emit = defineEmits<{
  (e: 'participant-selected', p: Participant[]): void,
  (e: 'participant-added', p: Participant): void,
  (e: 'notify', m: string): void
}>()

watch(participants, (newVal: string[]) => {
  const p = availableParticipants.value.filter((p : Participant) => newVal.includes(p.id))
  if (maxParticipants.value !== 0 && p.length > maxParticipants.value) {
    emit('notify', `You can't select more than ${maxParticipants.value} participants!`)
  } else {
    emit('participant-selected', p)
  }
})

refreshParticipants()

const { $addParticipant, $getParticipants } = useNuxtApp()

function pushParticipant (name: string) {
  $addParticipant(name)
  participantName.value = ''
  refreshParticipants()
  addingParticipant.value = false
}

function refreshParticipants () {
  $getParticipants().then((participants : Participant[]) => {
    availableParticipants.value = participants
  })
}
</script>

<style>
.p-check-box:checked + label {
  background-color: #0D9488;
}
</style>
