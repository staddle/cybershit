<template>
  <div class="relative overflow-hidden flex justify-center">
    <div class="over" />
    <div class="flex flex-col animate-move-y absolute" :style="{'animation-delay': `${delay}s`}">
      <LeagueRoleComponent v-for="(role,i) in roles" :key="i" :role="role" :show-name="false" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RoleAnimation',
  props: {
    delay: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    roles: [4, 0, 1, 2, 3, 4, 0]
  })
})
</script>

<style>
@keyframes move-y {
  0% {
    transform: translateY(-75%);
  }
  100% {
    transform: translateY(-4%);
  }
}

.animate-move-y {
  animation: move-y 1s linear infinite;
}

.over {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(0deg, #1e293b 10%, #ffffff00 50%, #1e293b 90%);
}
</style>
