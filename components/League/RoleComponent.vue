<template>
  <div v-if="role != undefined">
    <img :src="require(`~/assets/img/${roleName}.webp`)" :alt="roleName" :width="width" :height="height">
  </div>
  <FontAwesomeIcon v-else icon="x" />
</template>

<script lang="ts" setup>
import { Role } from '~/model/Season'

export interface Props {
  role: number
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 32,
  height: 32
})

const { role, width, height } = toRefs(props)

width.value = width.value ?? 32
height.value = height.value ?? 32

const roleName = computed(() =>  Role[role.value])
</script>
