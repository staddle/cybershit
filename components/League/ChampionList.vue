<template>
  <div class="flex flex-col">
    <div>
      <button class="rounded-full bg-blue-600 px-4 py-2 text-white" @click.prevent="randomChampion()">
        Random Champion
      </button>
    </div>
    <div>
      <button v-for="role in roles()" :key="role.toString()" @click.prevent="selectRole(role)">
        <LeagueRoleComponent
          :role="role"
          :show-name="false"
          class="hover:opacity-75"
          :class="{'bg-slate-200': selectedRole == role}"
        />
      </button>
    </div>
    <div class="flex flex-wrap flex-row">
      <LeagueChampIcon
        v-for="champ in champions"
        :key="champ.key"
        :champ="champ"
        :not-playable="isPlayable(champ)"
        :class="{'hidden': !displayChampion(champ)}"
        @select-champion="selectChampion(champ)"
        @notify="$emit('notify', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Champion } from '~/model/Champion'
import { Role } from '~/model/Season'
declare type RoleTypes = keyof typeof Role

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
      champions: [] as Champion[],
      selectedRole: null as Role | null
    }
  },
  computed: {
    championsFiltered () : Champion[] {
      if (this.selectedRole) {
        return this.champions.filter(c => c.roles.includes(this.selectedRole ?? Role.TOP))
      }
      return this.champions
    }
  },
  async mounted () {
    this.champions = await this.$database.getChampionList()
  },
  methods: {
    isPlayable (champ: Champion) : boolean {
      return this.notChampions.length > 0 ? this.notChampions.find(c => c.key === champ.key) !== undefined : false
    },
    randomChampion () : void {
      const notChampions = this.notChampions.map(c => c.key)
      const champions = this.champions.filter(c => notChampions.includes(c.key) === false)
      const randomChampion = champions[Math.floor(Math.random() * champions.length)]
      this.$emit('select-champion', randomChampion)
    },
    roles () : number[] {
      return [Role.TOP, Role.JUNGLE, Role.MID, Role.BOT, Role.SUPPORT]
    },
    selectRole (roleString : number) : void {
      const role : Role = Role[Role[roleString] as RoleTypes]
      this.selectedRole = role === this.selectedRole ? null : role
    },
    displayChampion (champ: Champion) : boolean {
      if (champ.roles) {
        return this.selectedRole ? champ.roles.includes(this.selectedRole) : true
      } else {
        console.log(champ.id + ' has no roles')
        return true
      }
    },
    selectChampion (champ: Champion) : void {
      this.$emit('select-champion', champ)
    }
  }
})
</script>
