<template>
  <div class="jumbotron">
    <h1 class="brandHeader">
      QuizApp
    </h1>
    <button class="btn btn-primary">
      Create
    </button>
    <span>OR</span>
    <div>
      Enter a quiz code
      <input type="text" name="code">
      <label for="code">Code</label>
      <button class="btn btn-primary">
        Join
      </button>
    </div>
  </div>
</template>

<script>
export default {

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
