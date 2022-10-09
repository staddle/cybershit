<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <label for="season">Season:</label>
      <select id="season" v-model="selectedSeason">
        <option v-for="season in seasons" :key="season.id" :value="season.id">
          {{ season.name }}
        </option>
      </select>
    </div>
    <div v-if="selectedSeason != ''">
      <label for="match">Match:</label>
      <select id="match" v-model="selectedMatch">
        <option v-for="match in matches" :key="match.id">
          {{ new Date(match.date).toLocaleDateString() }}
        </option>
      </select>
      <button class="rounded-full bg-blue-600 text-white px-4 py-2" @click.prevent="addingMatch = true">
        Add Match for Today
      </button>
      <div v-if="addingMatch">
        <LeagueAdminSelectParticipants
          :season="selectedSeasonObject"
          :allow-add-participants="false"
          @participant-selected="(p) => setParticipants(p)"
        />
        <button class="rounded-full bg-blue-600 text-white px-4 py-2" @click.prevent="addMatch">
          Add Match
        </button>
      </div>
    </div>
    <div v-if="selectedSeason != '' && selectedMatch != null" class="flex flex-row">
      <label for="player">Player:</label>
      <select v-if="players" id="player" v-model="selectedParticipant">
        <option v-for="player in players" :key="player.id">
          {{ player.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Champion, ChampionParticipant, Match, Participant, Season } from '~/model/Season'

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
      selectedMatch: null as Match | null,
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
    }
  },
  watch: {
    selectedSeason (newSeason) {
      if (newSeason) {
        this.$emit('season-selected', newSeason)
      }
    },
    selectedParticipant (newParticipant) {
      if (newParticipant) {
        this.$emit('participant-selected', newParticipant)
      }
    },
    selectedMatch (newMatch) {
      if (newMatch) {
        this.$emit('match-selected', newMatch)
      }
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
          date: (Number)(new Date())
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
