<template>
  <div class="flex flex-col bg-slate-800 rounded-md border border-teal-600 px-8 pt-4 transition-all">
    <div class="flex flex-row">
      <div class="flex flex-row mr-4">
        <label for="season" class="mr-2">Season:</label>
        <select id="season" v-model="selectedSeason" class="px-2 py-1 bg-slate-700 rounded-md">
          <option v-for="season in seasons" :key="season.id" :value="season.id">
            {{ season.name }}
          </option>
        </select>
        <router-link v-if="!seasons || seasons.length == 0" to="/flexerator/admin" class="rounded-md bg-teal-600 text-white px-2 py-px ml-1 border border-teal-600">
          <FontAwesomeIcon :icon="['fas', 'plus']" />
        </router-link>
      </div>
      <div class="mr-4">
        <label for="match" class="mr-2">Match:</label>
        <select
          id="match"
          v-model="selectedMatch"
          class="px-2 py-1 bg-slate-700 rounded-md disabled:border disabled:border-slate-600"
          :disabled="selectedSeason == ''"
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
          <button class="absolute top-0 right-0 pr-2 pt-1 text-teal-400 hover:text-teal-600 w-6 h-6" @click.prevent="closeAddingMatch()">
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
    <div class="flex flex-col justify-center pt-2">
      <div :class="{'hidden': !detailsShown}">
        <hr class="border-teal-600 my-2 w-2/3 mx-auto">
        <div v-if="selectedParticipant != ''" class="flex flex-row">
          <span class="align-middle">
            {{ selectedParticipant }}'<span v-if="selectedParticipant.charAt(selectedParticipant.length-1)!='s'">s</span> previous champions:
          </span>
          <div v-for="champ in champsOfParticipant" :key="champ.champ.id" class="tooltip relative flex justify-center">
            <span class="tooltip-shown absolute bg-slate-700 z-10 px-2 py-1 rounded-md border border-teal-600 whitespace-nowrap">
              {{ new Date(champ.date).toLocaleDateString() }} in {{ getRoleName(champ.role) }}
            </span>
            <LeagueChampIcon
              :champ="champ.champ"
              :clickable="false"
              :height="32"
              :width="32"
              class="px-1"
            />
          </div>
        </div>
      </div>
      <span class="pb-2 px-4 mx-auto text-teal-600 hover:text-teal-500 hover:cursor-pointer" @click.prevent="toggleDetails()">
        <FontAwesomeIcon v-if="!detailsShown" icon="chevron-down" />
        <FontAwesomeIcon v-if="detailsShown" icon="chevron-up" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Champion } from '~/model/Champion'
import { ChampionParticipant, Match, MatchState, Participant, Role, Season } from '~/model/Season'

const props = defineProps<{
  seasons: Season[]
}>()

const emit = defineEmits<{
  (e: 'season-selected', season: string): void,
  (e: 'participant-selected', participant: Participant): void,
  (e: 'match-selected', match: string): void,
  (e: 'notify', message: string): void
}>()

const { seasons } = toRefs(props)
const selectedSeason = ref('')
const selectedParticipant = ref('')
const selectedMatch = ref('')
const addingMatch = ref(false)
const name = ref('')
const detailsShown = ref(false)
const playersForMatch = ref<Participant[]>([])
const players = computed(() : Participant[] => {
  return selectedSeasonObject.value?.matches?.find(x => x.id === selectedMatch.value)?.champions.map(x => x.participant) ?? []
})
const selectedSeasonObject = computed((): Season | undefined => {
  return seasons.value.find((x: Season) => x.id === selectedSeason.value)
})
const matches = computed((): Match[] => {
  return selectedSeasonObject.value?.matches ?? []
})
const isMatchToday = computed((): Match[] => {
  return matches.value.filter((x: Match) => new Date(x.date).toDateString() === new Date().toDateString())
})

const champsOfParticipant = computed((): {champ: Champion, date: Date, role: Role}[] => {
  return selectedSeasonObject.value?.matches?.map((x) => {
    const champP = x.champions.find(x => x.participant.name === selectedParticipant.value)
    return { champ: champP?.champion ?? {} as Champion, date: new Date(x.date), role: champP?.role ?? Role.TOP }
  }).filter(x => x.champ.id) ?? []
})

watch(seasons, (newSeasons: Season[]) => {
  if (newSeasons.length > 0) {
    selectedSeason.value = newSeasons[0].id
  }
})
watch(selectedSeason, (newSeason) => {
  if (newSeason) {
    emit('season-selected', newSeason)
    const matches = seasons.value.find((x: Season) => x.id === newSeason)?.matches
    if (matches) {
      if (matches.length === 0) {
        addingMatch.value = true
      } else if (matches.length === 1) {
        selectedMatch.value = matches[0].id
      } else if (isMatchToday.value.length > 0) {
        selectedMatch.value = isMatchToday.value[0].id
      } else {
        selectedMatch.value = matches[0].id
      }
    }
}
})
watch(selectedParticipant, (newParticipant : string) => {
  if (newParticipant) {
    emit('participant-selected', players.value.find((x: Participant) => x.name === newParticipant))
    // localStorage
    localStorage.setItem('selectedParticipant', newParticipant)
  }
})

watch(selectedMatch, (newMatch) => {
  if (newMatch) {
    if (newMatch === 'new') {
      addingMatch.value = true
    } else {
      selectedParticipant.value = ''
      emit('match-selected', newMatch)
      emit('participant-selected', null)
      getLocalStorage()
    }
  }
})

//mounted
onMounted(() => {
  if (seasons.value.length === 1) {
    selectedSeason.value = seasons.value[0].id
  }
  getLocalStorage()
})
const { $addMatch } = useNuxtApp()

//methods
function setParticipants (participants: Participant[]) {
  playersForMatch.value = participants
}

function getLocalStorage () {
  const lS = localStorage.getItem('selectedParticipant')
  if (lS) {
    selectedParticipant.value = lS?.toString() ?? ''
    emit('participant-selected', players.value.find((x: Participant) => x.name === selectedParticipant.value))
  }
}

function addMatch () {
  if (selectedSeasonObject.value && playersForMatch.value.length > 0) {
    const newMatch : Match = {
      id: '',
      name: name.value,
      champions: playersForMatch.value.map((p) => {
        return {
          champion: null as Champion | null,
          participant: p
        } as ChampionParticipant
      }),
      date: (Number)(new Date()),
      state: MatchState.CREATED
    }
    const newId = $addMatch(newMatch, selectedSeasonObject.value.id)
    selectedMatch.value = newId
    name.value = ''
    addingMatch.value = false
  } else {
    alert('Please select a season and at least one player')
  }
}

function getMatchName (match: Match) {
  if (!match.name) {
    return new Date(match.date).toLocaleDateString()
  }
  if (matches.value.filter(x => x.name === match.name).length > 1) {
    return `${match.name} (${new Date(match.date).toLocaleDateString()})`
  } else {
    return match.name
  }
}

function closeAddingMatch () {
  addingMatch.value = false
  selectedMatch.value = ''
}

function toggleDetails () {
  if (selectedMatch.value !== '') {
    if (selectedParticipant.value !== '') {
      detailsShown.value = !detailsShown.value
    } else {
      emit('notify', 'Please select a participant first...')
    }
  } else {
    emit('notify', 'Please select a match first...')
  }
}

function getRoleName (role: Role) {
  switch (role) {
    case Role.TOP:
      return 'Top'
    case Role.JUNGLE:
      return 'Jungle'
    case Role.MID:
      return 'Mid'
    case Role.BOT:
      return 'Bot'
    case Role.SUPPORT:
      return 'Support'
  }
}

</script>

<style>
.tooltip .tooltip-shown {
  opacity: 0;
  top: -2.3rem;
  transition: all 0.1s ease-in;
}
.tooltip:hover .tooltip-shown{
  opacity: 1;
}
</style>
