<template>
  <div>
    <h1>Scoreboard</h1>
    <div class="scoreboard">
      <div class="scoreboard__header">
        <div class="scoreboard__header__name">
          Name
        </div>
        <div class="scoreboard__header__score">
          Score
        </div>
      </div>
      <div class="scoreboard__body">
        <div v-for="score in scores" :key="score.id" class="scoreboard__body__row">
          <div class="scoreboard__body__row__name">
            {{ score.name }}
          </div>
          <div class="scoreboard__body__row__score">
            {{ score.score }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            scores: [
                { id: 1, name: 'John', score: 100 },
                { id: 2, name: 'Jane', score: 200 },
                { id: 3, name: 'Jack', score: 300 },
                { id: 4, name: 'Jill', score: 400 },
                { id: 5, name: 'Joe', score: 500 }
            ]
        }
    }
}
</script>

<style>
.scoreboard {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
}
.scoreboard__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.scoreboard__header__name {
    font-weight: bold;
}
.scoreboard__header__score {
    font-weight: bold;
}
.scoreboard__body {
    display: flex;
    flex-direction: column;
}
.scoreboard__body__row {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
}
.scoreboard__body__row__name {
    font-weight: bold;
}
.scoreboard__body__row__score {
    font-weight: bold;
}
</style>
