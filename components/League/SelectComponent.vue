<template>
  <div class="flex flex-row bg-slate-800 rounded-md border border-teal-600 px-8 py-8">
    <div class="flex flex-row mr-4">
      <label for="season" class="mr-2">Season:</label>
      <select id="season" v-model="selectedSeason" class="px-2 py-1 bg-slate-700 rounded-md">
        <option v-for="season in seasons" :key="season.id" :value="season.id">
          {{ season.name }}
        </option>
      </select>
    </div>
    <div v-if="selectedSeason != ''" class="mr-4">
      <label for="match" class="mr-2">Match:</label>
      <select id="match" v-model="selectedMatch" class="px-2 py-1 bg-slate-700 rounded-md">
        <option v-for="match in matches" :key="match.id" :value="match.id">
          {{ new Date(match.date).toLocaleDateString() }}
        </option>
      </select>
      <button v-if="isMatchToday.length == 0" class="rounded-md bg-teal-600 text-white px-2 py-px border border-teal-600" @click.prevent="addingMatch = true">
        <FontAwesomeIcon :icon="['fas', 'plus']" />
      </button>
      <div v-if="addingMatch" class="fixed bg-black bg-opacity-40 top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div class="bg-slate-800 rounded-md border border-teal-600 h-fit py-4 relative w-48">
          <button class="absolute top-0 right-0 bg-slate-600 text-white w-6 h-6 rounded-md text-sm">
            <FontAwesomeIcon :icon="['fas', 'x']" />
          </button>
          <LeagueAdminSelectParticipants
            :season="selectedSeasonObject"
            :allow-add-participants="false"
            @participant-selected="(p) => setParticipants(p)"
          />
          <button class="rounded-md bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white px-4 py-2 mt-4" @click.prevent="addMatch">
            Add Match
          </button>
        </div>
      </div>
    </div>
    <div v-if="selectedSeason != '' && selectedMatch != null" class="flex flex-row">
      <label for="player" class="mr-2">Player:</label>
      <select v-if="players" id="player" v-model="selectedParticipant" class="px-2 py-1 bg-slate-700 rounded-md">
        <option v-for="player in players" :key="player.id">
          {{ player.name }}
        </option>
      </select>
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
      selectedParticipant: null as Participant | null,
      selectedMatch: '',
      playersForMatch: [] as Participant[],
      addingMatch: false
    }
  },
  computed: {
    players (): Participant[] {
      return this.selectedSeasonObject?.participants ?? []
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
    selectedParticipant (newParticipant) {
      if (newParticipant) {
        this.$emit('participant-selected', this.players.find((x: Participant) => x.name === newParticipant))
      }
    },
    selectedMatch (newMatch) {
      if (newMatch) {
        this.$emit('match-selected', newMatch)
      }
    }
  },
  mounted () {
    if (this.seasons.length === 1) {
      this.selectedSeason = this.seasons[0].id
    }
  },
  methods: {
    setParticipants (participants: Participant[]) {
      this.playersForMatch = participants
    },
    addMatch () {
      if (this.selectedSeasonObject && this.playersForMatch.length > 0) {
        const newMatch : Match = {
          id: '',
          champions: this.playersForMatch.map((p) => {
            return {
              champion: null as Champion | null,
              participant: p
            } as ChampionParticipant
          }),
          date: (Number)(new Date()),
          state: MatchState.CREATED
        }
        this.$emit('match-added', newMatch)
        this.addingMatch = false
      } else {
        alert('Please select a season and at least one player')
      }
    }
  }
})
</script>
