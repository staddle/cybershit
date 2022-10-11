<template>
  <div v-if="role != undefined" class="flex flex-row">
    <span>{{ roleName[0] + roleName.substring(1).toLowerCase() }}</span>
    <img v-if="roleName == 'TOP'" src="~/assets/img/TOP.webp" alt="TOP">
    <img v-if="roleName == 'JUNGLE'" src="~/assets/img/JUNGLE.webp" alt="JUNGLE">
    <img v-if="roleName == 'MID'" src="~/assets/img/MID.webp" alt="MID">
    <img v-if="roleName == 'BOT'" src="~/assets/img/BOT.webp" alt="BOT">
    <img v-if="roleName == 'SUPPORT'" src="~/assets/img/SUPPORT.webp" alt="SUPPORT">
  </div>
  <div v-else>
    No role for this participant
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Role } from '~/model/Season'

export default Vue.extend({
  name: 'RoleComponent',
  props: {
    role: {
      type: Object as () => Role | undefined,
      required: true
    },
    isOwn: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    roleName () : string {
      if (this.role !== undefined) {
        return Object.values(Role)[this.role] as string
      }
      return ''
    }
  }
})
</script>
