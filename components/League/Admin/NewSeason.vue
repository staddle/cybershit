<template>
  <div>
    <form>
      <span>ID: {{ seasonId }}</span>
      <label for="name">Name: </label>
      <input id="name" v-model="name">
      <label for="participants">Participants</label>
      <div class="flex flex-col">
        <div v-for="p in availableParticipants" :key="p.id">
          <input :id="p.id" v-model="participants" type="checkbox" :value="p.id">
          <label :for="p.id">{{ p.name }}</label>
        </div>
        <button @click="addingParticipant = true">
          Add Participant
        </button>
        <div v-if="addingParticipant">
          <label for="name">Name</label>
          <input id="name" v-model="participantName">
          <button @click="pushParticipant(participantName)">
            Submit
          </button>
        </div>
      </div>
      <button @click="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'LeagueAdminNewSeason',
  props: {
    season: {
      type: Object as () => Season,
      required: false,
      default: () => null
    },
    seasonsLength: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      seasonId: this.season?.id ?? this.seasonsLength,
      name: this.season?.name ?? '',
      participants: [] as string[],
      availableParticipants: [] as Participant[],
      participantName: '',
      addingParticipant: false
    }
  },
  mounted () {
    this.refreshParticipants()
    if (this.season != null) {
      this.participants = this.season.participants.map((p : Participant) => p.id.toString())
    }
  },
  methods: {
    submit () {
      this.$emit('season-created', {
        name: this.name,
        participants: this.participants.map((p : string) => this.availableParticipants.find((x : Participant) => x.id === Number.parseInt(p)))
      } as Season)
    },
    pushParticipant (name: string) {
      const newParticipant : Participant = {
        name,
        id: this.availableParticipants.length
      }
      const dbRef = this.$fire.database.ref('lol/participants')
      dbRef.push(newParticipant).then(this.refreshParticipants)
      this.addingParticipant = false
    },
    refreshParticipants () {
      const dbRef = this.$fire.database.ref('lol/participants')
      dbRef.on('value', (snapshot) => {
        this.availableParticipants = snapshot.val()
      })
    }
  }
})
</script>

<style>

</style>
