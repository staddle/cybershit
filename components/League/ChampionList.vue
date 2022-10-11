<template>
  <div class="flex flex-wrap flex-row">
    <LeagueChampIcon
      v-for="champ in champions"
      :key="champ.key"
      :champ="champ"
      :not-playable="isPlayable(champ)"
      @select-champion="(c) => $emit('select-champion', c)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Champion } from '~/model/Champion'

export default Vue.extend({
  name: 'ChampionList',
  props: {
    notChampions: {
      type: Array as () => Champion[],
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      champions: [] as Champion[]
    }
  },
  async mounted () {
    this.champions = await this.$database.getChampionList()
  },
  methods: {
    isPlayable (champ: Champion) : boolean {
      console.log(this.notChampions)
      return this.notChampions.length > 0 ? this.notChampions.find(c => c.key === champ.key) !== undefined : false
    }
  }
})
</script>
