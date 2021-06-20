<template>
  <img alt="Vue logo" width="256" height="256" src="./assets/logo.png">
  <div>
    <h1>Birth Certificates</h1>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">Add</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">View</a></li>
    </ul>
    <Add/>
  </div>
</template>

<script>
import Add from './components/Add.vue'

export default {
  name: 'App',
  components: {
    Add
  }
}
</script>

<style lang="scss">
@import "node_modules/spectre.css/src/spectre";
@import "node_modules/spectre.css/src/forms";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
