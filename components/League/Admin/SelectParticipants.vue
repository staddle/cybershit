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
    </div>
    <button v-if="allowAddParticipants" class="rounded-md bg-teal-600 text-white py-2 mt-4" @click.prevent="addingParticipant = true">
      Add Participant
    </button>
    <div v-if="addingParticipant">
      <label for="name">Name</label>
      <input id="name" v-model="participantName" class="border border-blue-600 rounded-full">
      <button class="rounded-full bg-blue-400 text-white py-2 px-4" @click.prevent="pushParticipant(participantName)">
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'SelectParticipants',
  props: {
    season: {
      type: Object as () => Season,
      required: true
    },
    allowAddParticipants: {
      type: Boolean,
      required: false,
      default: false
    },
    maxParticipants: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      availableParticipants: [] as Participant[],
      participantName: '',
      addingParticipant: false,
      participants: []
    }
  },
  watch: {
    participants (newVal) {
      const p = this.availableParticipants.filter((p : Participant) => newVal.includes(p.id))
      if (this.maxParticipants !== 0 && p.length > this.maxParticipants) {
        this.$emit('notify', `You can't select more than ${this.maxParticipants} participants!`)
      } else {
        this.$emit('participant-selected', p)
      }
    }
  },
  mounted () {
    this.refreshParticipants()
  },
  methods: {
    pushParticipant (name: string) {
      this.$database.addParticipant(name)
      this.refreshParticipants()
      this.addingParticipant = false
    },
    refreshParticipants () {
      this.$database.getParticipants().then((participants : Participant[]) => {
        this.availableParticipants = participants
      })
    }
  }
})
</script>

<style>
.p-check-box:checked + label {
  background-color: #0D9488;
}
</style>
