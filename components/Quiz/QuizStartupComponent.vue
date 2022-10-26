<template>
  <div class="jumbotron">
    <h1 class="brandHeader">
      QuizApp
    </h1>
    <button class="btn btn-primary" @click="createNew()">
      Create
    </button>
    <span>OR</span>
    <div>
      Enter a quiz code
      <input v-model="code" type="text" name="code">
      <label for="code">Code</label>
      <button class="btn btn-primary" @click="joinCode(code)">
        Join
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code: ''
    }
  },
  async mounted () {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async createNew () {
      try {
        const token = await this.$recaptcha.execute('login')
        console.log('ReCaptcha token:', token)

        // send token to server alongside your form data
      } catch (error) {
        console.log('Login error:', error)
      }
      this.$router.push('/quiz/create')
    },
    joinCode (code) {
      this.$router.push('/quiz/join/' + code)
    }
  }
}
</script>

<style>
.jumbotron{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.btn{
  margin: auto auto;
}
</style>
