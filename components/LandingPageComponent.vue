<template>
  <div class="w-screen grid justify-items-center text-slate-900 bg-white">
    <div class="font-sans mt-16 mx-8 p-8 shadow-2xl grid lg:w-1/4 lg:min-w-fit">
      <div class="font-extrabold text-4xl mb-4">
        Create <span class="text-blue-600 drop-shadow-xl">responsive</span><br>
        quizzes for
        <span class="text-blue-600">free</span><br>
        with <span class="text-blue-600">ease</span>
      </div>
      <div class="text-slate-500 mb-4 grid grid-flow-row">
        <span>
          <span class="text-blue-600">■</span>
          No registration required
        </span>
        <span>
          <span class="text-blue-600">■</span>
          Create a code for anyone to join your quiz
        </span>
        <span>
          <span class="text-blue-600">■</span>
          Scoreboards for everyone to see
        </span>
      </div>
      <div class="font-bold mb-6">
        Available soon
      </div>
      <div>
        <button class="bg-blue-600 text-white py-2 px-4 mr-2 hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-none" @click="newsletterPopOut=true">
          Join the newsletter
        </button>
        <button class="bg-blue-100 py-2 px-4 hover:bg-sky-100 active:bg-blue-200 focus-visible:outline-none">
          Check out the code
        </button>
      </div>
      <div v-if="newsletterPopOut">
        <div class="grid grid-flow-row mt-8" method="get">
          Enter your address to stay up-to-date:
          <input v-model="customerEmail" type="text" name="email" placeholder="your@email.com" class="shadow-xl bg-blue-600 px-4 py-2 text-white placeholder:text-blue-300">
          <button class="bg-blue-600 text-white py-2 px-4 mr-2 hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-none" @click="addNewsletter(customerEmail)">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      newsletterPopOut: false,
      customerEmail: ''
    }
  },
  methods: {
    async addNewsletter (email : string) {
      const dbRef = this.$fire.database.ref('newsletter')
      const subscribeTime = new Date().toISOString()
      await dbRef.push({
        email,
        date: subscribeTime
      })
    }
  }
})
</script>

<style>

</style>
