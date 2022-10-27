<template>
  <div class="w-full h-full flex flex-col align-middle justify-center">
    <div class="bg-slate-800 rounded-md border border-teal-600 mx-auto pb-8 pt-4">
      <div class="mx-4 flex flex-row justify-between">
        <h1 class="font-bold text-2xl">
          Admin Console
        </h1>
        <FontAwesomeIcon icon="arrow-right-to-bracket" class="cursor-pointer hover:text-teal-500" @click.prevent="$router.push('/flexerator')" />
      </div>
      <hr class="border-teal-600 mt-1">
      <div class="mx-4 mt-4">
        <label for="season" class="mr-2">Season: </label>
        <select id="seasons" v-model="selectedSeasonIndex" class="rounded-md bg-slate-700 py-1 px-2">
          <option v-for="season in seasons" :key="season.id" :value="season.id">
            {{ season.name }}
          </option>
          <option value="new">
            New Season
          </option>
        </select>
        <LeagueAdminNewSeason
          :season="selectedSeason"
          :seasons-length="seasons.length"
          class="mt-2"
          @season-created="(s) => seasonAdded(s)"
        />
        <LeagueAdminSelectParticipants
          v-if="selectedSeason != null"
          :season="selectedSeason"
          :allow-add-participants="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Season } from '~/model/Season'


const selectedSeasonIndex = ref('new')
const seasons = ref<Season[]>([])
const selectedSeason = ref<Season>(null)
const loading = ref(true)

watch(selectedSeasonIndex, (val) => {
  if (val === 'new') {
    selectedSeason.value = null
  } else {
    const tempSeason = seasons.value.find((x : Season) => x.id === selectedSeasonIndex.value)
    if (tempSeason) { selectedSeason.value = tempSeason } else { selectedSeason.value = null }
  }
})

onMounted(() => refreshSeasons())

const { $getSeasons, $addSeason } = useNuxtApp()

function refreshSeasons () {
  $getSeasons().then((seasonsRet: Season[]) => {
    loading.value = false
    seasons.value = seasonsRet
    if (seasons.value && seasons.value.length > 0) {
      selectedSeasonIndex.value = seasons.value[0].id.toString()
    }
  })
}

function seasonAdded (newSeason : Season) {
  const newId = $addSeason(newSeason)
  refreshSeasons()
  selectedSeasonIndex.value = newId
}
</script>
