<template>
  <div class="w-screen grid justify-items-center text-slate-900 bg-white">
    <div class="font-sans mt-16 mx-8 p-8 shadow-2xl grid lg:w-1/3 lg:min-w-fit">
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
      <div class="flex flex-row justify-between">
        <button class="bg-blue-600 rounded-full text-white py-2 px-4 mr-2 w-full hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-none" @click="newsletterPopOut=true">
          Join the newsletter
        </button>
        <button class="bg-blue-100rounded-full  py-2 px-4 w-full hover:bg-sky-100 active:bg-blue-200 focus-visible:outline-none" @click="goToGithub()">
          Check out the dev
        </button>
      </div>
      <div v-if="newsletterPopOut">
        <div class="grid grid-flow-row mt-8" method="get">
          <span class="text-slate-500">
            Enter your address to stay up-to-date:
          </span>
          <label class="relative block mt-2 w-full">
            <span class="sr-only">Email address</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome-icon icon="at" class="text-slate-300 ml-0 mr-auto flex-1" />
            </span>
            <div class="flex flex-row justify-between">
              <input v-model="customerEmail" type="text" name="email" placeholder="your@email.com" class="shadow-sm pl-9 px-2 py-2 mr-2 w-full text-slate-600 border border-slate-300 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600">
              <button class="bg-blue-600 text-white py-2 px-4 mr-2 border border-blue-600 hover:bg-blue-500 hover:border-blue-500 active:bg-blue-700 active:border-blue-700 focus-visible:outline-none" @click="addNewsletter(customerEmail)">
                Subscribe
              </button>
            </div>
          </label>
          <span v-if="confirmationMessage!=''" class="text-blue-600 mt-2">
            {{ confirmationMessage }}
          </span>
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
      confirmationMessage: '',
      customerEmail: ''
    }
  },
  methods: {
    async addNewsletter (email : string) {
      const dbRef = this.$fire.database.ref('newsletter')
      const subscribeTime = new Date().toISOString()
      try {
        await dbRef.push({
          email,
          date: subscribeTime
        }).then(() => {
          this.confirmationMessage = 'Thank you for subscribing!'
        })
      } catch (e) {
        this.confirmationMessage = 'Something went wrong. Please try again later.'
      }
    },
    goToGithub () {
      window.open('https://github.com/staddle', '_blank')
    }
  }
})
</script>

<style>

</style>
