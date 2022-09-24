<template>
  <div class="background h-screen">
    <div class="grid justify-items-center text-slate-900 md:mx-6 mx-2 h-full">
      <div class="w-full h-fit mt-28 md:mt-40 grid justify-items-center">
        <div class="font-sans w-full h-fit p-8 shadow-xl grid max-w-xl min-w-fit bg-white rounded-lg shadow-[#2563EB66] ring-2 ring-blue-50">
          <div class="font-extrabold text-4xl mb-4 grid gap-4 grid-flow-row">
            <div>
              Create
              <span class="before:block before:absolute before:-inset-1 before:rounded-lg before:h-12 before:translate-y-1 before:bg-blue-600 relative inline-block">
                <span class="relative text-white">competent</span>
              </span>
            </div>
            <div>
              quizzes for
              <span class="before:block before:absolute before:-inset-1 before:rounded-lg before:h-12 before:translate-y-1 before:bg-blue-600 relative inline-block">
                <span class="relative text-white">free</span>
              </span>
            </div>
            <div>
              with
              <span class="before:block before:absolute before:-inset-1 before:rounded-lg before:h-12 before:translate-y-1 before:bg-blue-600 relative inline-block">
                <span class="relative text-white">ease</span>
              </span>
            </div>
          </div>
          <div class="flex sm:flex-row flex-col">
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
            <div class="font-bold mb-6 sm:text-right grow">
              Available soon
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <button class="bg-blue-600 rounded-lg text-white py-2 px-4 mr-2 w-full hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-none" @click="newsletterPopOut=!newsletterPopOut">
              <font-awesome-icon icon="envelope" class="mr-1" /> Newsletter
            </button>
            <button class="bg-blue-100 rounded-lg  py-2 px-4 w-full hover:bg-sky-100 active:bg-blue-200 focus-visible:outline-none" @click="goToGithub()">
              <font-awesome-icon icon="user" class="mr-1" /> Who am I?
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
                  <input
                    v-model="customerEmail"
                    type="text"
                    name="email"
                    placeholder="your@email.com"
                    class="shadow-sm pl-9 px-2 py-2 w-full text-slate-600 border rounded-lg rounded-r-none border-slate-300 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    @keyup.enter="addNewsletter(customerEmail)"
                  >
                  <button class="bg-blue-600 text-white py-2 px-4 mr-2 border rounded-r-lg border-blue-600 hover:bg-blue-500 hover:border-blue-500 active:bg-blue-700 active:border-blue-700 focus-visible:outline-none" @click="addNewsletter(customerEmail)">
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
  .background{
    background-image: url('@/assets/img/blob-scene-haikei-blue-white-vertical.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    @media screen and (min-width: 782px) {
      background-image: url('@/assets/img/blob-scene-haikei-blue-white.svg');
    }
  }
  </style>
