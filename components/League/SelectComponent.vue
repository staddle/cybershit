<template>
  <div class="flex flex-row bg-slate-800 rounded-md border border-teal-600 px-8 py-4">
    <div class="flex flex-row mr-4">
      <label for="season" class="mr-2">Season:</label>
      <select id="season" v-model="selectedSeason" class="px-2 py-1 bg-slate-700 rounded-md">
        <option v-for="season in seasons" :key="season.id" :value="season.id">
          {{ season.name }}
        </option>
      </select>
      <router-link v-if="!seasons || seasons.length == 0" to="flexerator/admin" class="rounded-md bg-teal-600 text-white px-2 py-px ml-1 border border-teal-600">
        <FontAwesomeIcon :icon="['fas', 'plus']" />
      </router-link>
    </div>
    <div class="mr-4">
      <label for="match" class="mr-2">Match:</label>
      <select
        id="match"
        v-model="selectedMatch"
        class="px-2 py-1 bg-slate-700 rounded-md disabled:border disabled:border-slate-600"
        :disabled="selectedSeason == '' || matches.length == 0"
      >
        <option value="new">
          New Match
        </option>
        <option v-for="match in matches" :key="match.id" :value="match.id">
          {{ getMatchName(match) }}
        </option>
      </select>
    </div>
    <div class="flex flex-row">
      <label for="player" class="mr-2">Player:</label>
      <select
        v-if="players"
        id="player"
        v-model="selectedParticipant"
        class="px-2 py-1 bg-slate-700 rounded-md disabled:border disabled:border-slate-600"
        :disabled="selectedSeason === '' || selectedMatch == ''"
      >
        <option v-for="player in players" :key="player.id">
          {{ player.name }}
        </option>
      </select>
    </div>
    <div v-if="addingMatch" class="fixed bg-black bg-opacity-40 z-10 top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div class="bg-slate-800 rounded-md border border-teal-600 h-fit py-4 relative px-4">
        <button class="absolute top-0 right-0 pr-2 pt-1 text-teal-400 hover:text-teal-600 w-6 h-6" @click.prevent="addingMatch = false">
          <FontAwesomeIcon icon="xmark" />
        </button>
        <h1 class="text-lg">
          Add Match for {{ new Date().toLocaleDateString() }}
        </h1>
        <hr class="border-teal-600 mt-1 mb-2">
        <div class="my-2">
          <label for="name">Name:</label>
          <input id="name" v-model="name" placeholder="Name..." class="bg-slate-700 px-2 py-1 rounded-md focus-visible:outline-teal-600 focus-visible:outline-1 focus-visible:outline">
        </div>
        <LeagueAdminSelectParticipants
          :season="selectedSeasonObject"
          :allow-add-participants="true"
          :max-participants="5"
          @participant-selected="(p) => setParticipants(p)"
          @notify="$emit('notify', $event)"
        />
        <button class="rounded-md bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white px-4 py-2 mt-4" @click.prevent="addMatch">
          Add Match
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Champion } from '~/model/Champion'
import { ChampionParticipant, Match, MatchState, Participant, Season } from '~/model/Season'

export default Vue.extend({
  name: 'SelectComponent',
  props: {
    seasons: {
      type: Array as () => Season[],
      required: true
    }
  },
  data () {
    return {
      selectedSeason: '',
      selectedParticipant: '',
      selectedMatch: '',
      playersForMatch: [] as Participant[],
      addingMatch: false,
      name: ''
    }
  },
  computed: {
    players (): Participant[] {
      return this.selectedSeasonObject?.matches?.find(x => x.id === this.selectedMatch)?.champions.map(x => x.participant) ?? []
    },
    selectedSeasonObject (): Season | undefined {
      return this.seasons.find((x: Season) => x.id === this.selectedSeason)
    },
    matches (): Match[] {
      return this.selectedSeasonObject?.matches ?? []
    },
    isMatchToday (): Match[] {
      return this.matches.filter((x: Match) => new Date(x.date).toDateString() === new Date().toDateString())
    }
  },
  watch: {
    seasons (newSeasons: Season[]) {
      if (newSeasons.length > 0) {
        this.selectedSeason = newSeasons[0].id
      }
    },
    selectedSeason (newSeason) {
      if (newSeason) {
        this.$emit('season-selected', newSeason)
        const matches = this.seasons.find((x: Season) => x.id === newSeason)?.matches
        if (matches) {
          if (matches.length === 0) {
            this.addingMatch = true
          } else if (matches.length === 1) {
            this.selectedMatch = matches[0].id
          } else if (this.isMatchToday.length > 0) {
            this.selectedMatch = this.isMatchToday[0].id
          } else {
            this.selectedMatch = matches[0].id
          }
        }
      }
    },
    selectedParticipant (newParticipant : string) {
      if (newParticipant) {
        this.$emit('participant-selected', this.players.find((x: Participant) => x.name === newParticipant))
        // localStorage
        localStorage.setItem('selectedParticipant', newParticipant)
      }
    },
    selectedMatch (newMatch) {
      if (newMatch) {
        if (newMatch === 'new') {
          this.addingMatch = true
        } else {
          this.selectedParticipant = ''
          this.$emit('match-selected', newMatch)
          this.$emit('participant-selected', null)
          this.getLocalStorage()
        }
      }
    }
  },
  mounted () {
    if (this.seasons.length === 1) {
      this.selectedSeason = this.seasons[0].id
    }
    this.getLocalStorage()
  },
  methods: {
    setParticipants (participants: Participant[]) {
      this.playersForMatch = participants
    },
    getLocalStorage () {
      const lS = localStorage.getItem('selectedParticipant')
      if (lS) {
        this.selectedParticipant = lS?.toString() ?? ''
        this.$emit('participant-selected', this.players.find((x: Participant) => x.name === this.selectedParticipant))
      }
    },
    addMatch () {
      if (this.selectedSeasonObject && this.playersForMatch.length > 0) {
        const newMatch : Match = {
          id: '',
          name: this.name,
          champions: this.playersForMatch.map((p) => {
            return {
              champion: null as Champion | null,
              participant: p
            } as ChampionParticipant
          }),
          date: (Number)(new Date()),
          state: MatchState.CREATED
        }
        const newId = this.$database.addMatch(newMatch, this.selectedSeasonObject.id)
        this.selectedMatch = newId
        this.name = ''
        this.addingMatch = false
      } else {
        alert('Please select a season and at least one player')
      }
    },
    getMatchName (match: Match) {
      if (!match.name) {
        return new Date(match.date).toLocaleDateString()
      }
      if (this.matches.filter(x => x.name === match.name).length > 1) {
        return `${match.name} (${new Date(match.date).toLocaleDateString()})`
      } else {
        return match.name
      }
    }
  }
})
</script>
