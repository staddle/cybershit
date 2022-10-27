<template>
  <div class="flex flex-col">
    <div class="flex flex-row mt-4 mx-4 justify-between">
      <div class="">
        <button v-for="role in roles()" :key="role.toString()" @click.prevent="selectRole(role)">
          <LeagueRoleComponent
            :role="role"
            :show-name="false"
            class="hover:opacity-50 rounded-md transition-all duration-75"
            :class="{'bg-slate-900': selectedRole == role}"
          />
        </button>
      </div>
      <div class="h-full relative inline leading-8">
        <FontAwesomeIcon class="text-teal-500 absolute left-2 top-0 py-2 pr-2 h-full" icon="magnifying-glass" />
        <input v-model="query" type="text" class="bg-slate-700 rounded-md pr-2 pl-8 text-white transition-all duration-100 outline outline-0 outline-teal-600 hover:bg-slate-600 focus-visible:outline focus-visible:outline-1" placeholder="Search...">
      </div>
    </div>
    <hr class="border-slate-600 w-full mt-2">
    <div class="grid grid-flow-row grid-cols-8 gap-4 mx-auto p-4">
      <button class="border-violet-800 border h-12 w-12 text-violet-600 hover:bg-violet-800 hover:text-white transition-all" @click.prevent="checkRandom = true; check = true">
        <FontAwesomeIcon icon="question" class="bouncy" />
      </button>
      <LeagueChampIcon
        v-for="champ in champions"
        :key="champ.key"
        :champ="champ"
        :not-playable="isPlayable(champ)"
        :class="{'hidden': !displayChampion(champ)}"
        @select-champion="preSelectedChamp = champ; check = true"
        @notify="$emit('notify', $event)"
      />
    </div>
    <div v-if="check" class="fixed bg-black bg-opacity-40 top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div class="bg-slate-800 rounded-md border border-teal-600 h-fit pb-6 pt-6 relative px-8">
        <button class="absolute top-0 right-0 pr-2 pt-1 text-teal-400 hover:text-teal-600 w-6 h-6" @click.prevent="check = false">
          <FontAwesomeIcon icon="xmark" />
        </button>
        <h1 v-if="!checkRandom" class="text-lg">
          Select {{ preSelectedChamp?.name }}?
        </h1>
        <h1 v-else class="text-lg">
          Select a random champ<span v-if="selectedRole != null"> for {{ roleDisplayName(selectedRole) }}</span>?
        </h1>
        <hr class="border-teal-600 mt-1 mb-2">
        <button class="rounded-md bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white px-4 py-2 mt-4" @click.prevent="checkRandom ? randomChampion() : selectChampion(preSelectedChamp)">
          Yes
        </button>
        <button class="rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-700 text-white px-4 py-2 mt-4" @click.prevent="check = false; checkRandom = false">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Champion } from '~/model/Champion'
import { Role } from '~/model/Season'

export interface Props {
  notChampions?: Champion[]
}

const props = withDefaults(defineProps<Props>(), {
  notChampions: () => [] as Champion[]
})

const { notChampions } = toRefs(props)

const emit = defineEmits<{
  (e: 'select-champion', champ: Champion): void
}>()

const champions = ref<Champion[]>([])
const selectedRole = ref<Role>(null)
const query = ref('')
const check = ref(false)
const checkRandom = ref(false)
const preSelectedChamp = ref<Champion>(null)

const { $database } = useNuxtApp()

champions.value = await $database().getChampionList()

function isPlayable (champ: Champion) : boolean {
  return notChampions.value.length > 0 ? notChampions.value.find(c => c.key === champ.key) !== undefined : false
}

function randomChampion () : void {
  const notChampionsMapped = notChampions.value.map(c => c.key)
  const championsFiltered = champions.value.filter(c => notChampionsMapped.includes(c.key) === false &&
    (selectedRole.value === null || c.roles.includes(selectedRole.value)))
  const randomChampion = championsFiltered[Math.floor(Math.random() * championsFiltered.length)]
  emit('select-champion', randomChampion)
}

function roles () : number[] {
  return [Role.TOP, Role.JUNGLE, Role.MID, Role.BOT, Role.SUPPORT]
}

function selectRole (roleString : number) : void {
  const role : Role = Role[Role[roleString] as (keyof typeof Role)]
  selectedRole.value = role === selectedRole.value ? null : role
}

function displayChampion (champ: Champion) : boolean {
  if (query.value.length > 0 && !(
    champ.name.toLowerCase().includes(query.value.toLowerCase()) ||
    champ.id.toLowerCase().includes(query.value.toLowerCase()) ||
    champ.name.toLowerCase().replace(/\s/g, '').includes(query.value.toLowerCase()))
  ) {
    return false
  }
  if (champ.roles) {
    return selectedRole.value != null ? champ.roles.includes(selectedRole.value) : true
  } else {
    // console.log(champ.id + ' has no roles')
    return true
  }
}

function selectChampion (champ: Champion) : void {
  emit('select-champion', champ)
}

function roleDisplayName (role : Role) : string {
  return Role[role].charAt(0).toUpperCase() + Role[role].slice(1).toLowerCase()
}
</script>

<style>
@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(25deg);
  }
  75% {
    transform: rotate(-25deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

button:hover>.bouncy{
  animation: wiggle 1s linear infinite;
}
</style>
