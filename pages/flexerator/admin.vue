<template>
  <div class="bg-slate-900 text-white w-screen h-screen overflow-auto">
    <LeagueAdminConsoleComponent />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'none'
})

onMounted( async () => {
  try {
    await this.$fire.appCheck.activate('6LcpH_8hAAAAADtqaMfhMoDlujroU70KL2ixcDBa')
  } catch (e) {
    // console.error(e)
  }
})
</script>

<style>
body {
  background-color: rgb(15 23 42 / var(--tw-bg-opacity));
}
</style>
