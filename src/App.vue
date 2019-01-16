<template>
  <div id="app">
    <vue-card-slide :width='data' @success='something' @error='something1'></vue-card-slide>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      data:'100px'
    }
  },
  methods:{
    something(value){
      console.log(value)
    },
    something1(value){
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
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
