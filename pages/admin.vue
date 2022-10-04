<template>
  <div>
    <LeagueAdminConsoleComponent />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LeagueAdminPage',
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
