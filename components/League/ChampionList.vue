<template>
  <div class="flex flex-wrap flex-row">
    <LeagueChampIcon v-for="champ in champions" :key="champ.key" :champ="champ" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RiotApi } from '~/model/RiotApi'
import { Champion } from '~/model/Champion'

export default Vue.extend({
  name: 'ChampionList',
  data () {
    return {
      champions: [] as Champion[]
    }
  },
  mounted () {
    RiotApi.riotApi().fetchChampions().then((champions : Champion[]) => {
      this.champions = champions
    })
  }
})
</script>
