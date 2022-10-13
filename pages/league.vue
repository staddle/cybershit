<template>
  <div class="bg-slate-900 text-white h-screen w-screen">
    <LeagueLandingPageComponent />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LeaguePage',
  layout: 'none',
  async mounted () {
    try {
      await this.$fire.appCheck.activate('6LcpH_8hAAAAADtqaMfhMoDlujroU70KL2ixcDBa')
    } catch (e) {
      // console.error(e)
    }
  }
})
</script>
