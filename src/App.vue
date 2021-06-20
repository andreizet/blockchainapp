<template>
  <img alt="Vue logo" width="256" height="256" src="./assets/logo.png">
  <div class="main-container p-centered">
    <h1>Birth Certificates</h1>
    <ul class="tab tab-block mb-2">
      <li class="tab-item"
          :class="view === 'add' ? 'active' : ''">
        <a href="#" @click="changeView('add')">
          Add
        </a>
      </li>
      <li class="tab-item"
          :class="view === 'view' ? 'active' : ''">
        <a href="#" @click="changeView('view')">
          View
        </a>
      </li>
    </ul>
    <Add v-if="view === 'add'"/>
  </div>
</template>

<script>
import Add from './components/Add.vue'

export default {
  name: 'App',
  components: {
    Add
  },
  data() {
    return {
      view: 'add',
    };
  },
  methods: {
    changeView(newView) {
      this.view = newView;
    },
  },
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
.main-container {
  width: 50%;
}

a:focus {
  box-shadow: unset;
}
</style>
