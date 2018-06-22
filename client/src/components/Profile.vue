<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-btn v-on:click="reset">reset</v-btn>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      msg: 'Welcome to PROFILE'
    }
  },
  methods: {
    reset () {
      this.$store.commit('RESET_STATE')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  color: #35495E;
}
</style>
