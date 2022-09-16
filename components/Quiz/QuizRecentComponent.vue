<template>
  <div>
    Recent quizzes:
    <ul>
      <li v-for="quiz in recent" :key="quiz.key">
        <a href="#">{{ quiz.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recent: [
        {
          key: 0,
          name: 'lol'
        },
        {
          key: 1,
          name: 'lol2'
        }
      ]
    }
  }
}
</script>

<style>

</style>
