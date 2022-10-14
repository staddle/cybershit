<template>
  <div v-if="role != undefined">
    <img :src="require(`~/assets/img/${roleName}.webp`)" :alt="roleName" :width="width" :height="height">
  </div>
  <FontAwesomeIcon v-else icon="x" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Role } from '~/model/Season'

export default Vue.extend({
  name: 'RoleComponent',
  props: {
    role: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: false,
      default: 32
    },
    height: {
      type: Number,
      required: false,
      default: 32
    }
  },
  computed: {
    roleName () : string {
      return Role[this.role]
    }
  }
})
</script>
