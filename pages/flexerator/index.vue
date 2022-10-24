<template>
  <div class="bg-slate-900 text-white w-screen min-h-screen flex flex-col justify-between">
    <LeagueLandingPageComponent />
    <LeagueFooterComponent />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'FlexeratorPage',
  layout: 'none',
  head: {
    title: 'Flexerator - LoL Randomizer',
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'Create a match and let Flexerator randomly select roles and champions for you and your friends.'
    }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icoGradientFlex.ico' }
    ]
  },
  async mounted () {
    try {
      await this.$fire.appCheck.activate('6LcpH_8hAAAAADtqaMfhMoDlujroU70KL2ixcDBa')
    } catch (e) {
      // console.error(e)
    }
  }
})
</script>

<style>
body {
  background-color: rgb(15 23 42 / var(--tw-bg-opacity));
}
</style>
