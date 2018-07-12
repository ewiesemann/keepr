<template>
  <div class="login">
    <button type="button" class="btn btn-primary btn-lg">Log In</button>
    <button type="button" class="btn btn-secondary btn-lg">Register</button>
  </div>
</template>

<script>
  import router from '../router'

export default {
  name: 'Home',
  component:{
    // keep
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
