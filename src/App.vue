<template>
  <div id="app">
    <StartButton/>
  </div>
</template>

<script>
import StartButton from "./components/StartButton.vue"
export default {
  name: "app",
  components: {
    StartButton
  }
}
</script>

<style>
body,
input,
button {
  font-family: Helvetica, sans-serif;
  font-size: 16pt;
}
ul li {
  list-style: none;
}
.app {
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 12px;
  margin: auto;
}
input:focus {
  box-shadow: none;
  outline: none;
  border-color: #40b883;
}
input {
  padding: 8px;
  border: solid 1px #bbb;
  border-radius: 2px;
}
</style>