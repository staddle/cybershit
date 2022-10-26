<template>
  <div>
    <div v-if="signedIn">
      <img :src="user.avatar">
    </div>
    <div v-else>
      <NuxtLink to="/login">
        Login
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginStatusComponent',
  data () {
    return {
      signedIn: false,
      user: { avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }
    }
  }
}
</script>

<style>

</style>
