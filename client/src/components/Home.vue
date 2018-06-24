<template>
  <div class="hello">
    <v-toolbar dark style="background: #5d91f7;" tabs>
      <v-toolbar-title class="white--text">Skill Nexus</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="reset">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <v-tabs
        slot="extension"
        v-model="tabs"
        fixed-tabs
        color="transparent"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#profile" class="primary--text">
          <v-icon>person</v-icon>
        </v-tab>
        <v-tab href="#learn" class="primary--text">
          <v-icon>school</v-icon>
        </v-tab>
        <v-tab href="#search" class="primary--text">
          <v-icon>search</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs" class="white elevation-1">
      <v-tab-item id="profile">
        <Profile></Profile>
      </v-tab-item>
      <v-tab-item id="learn">
        <v-card style="height: 90vh;">
          <v-card-text>E - LEARNING SECTION</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="search">
        <v-card>
          <Search></Search>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Profile from './childComponents/Profile'
import Search from './childComponents/Search'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to PROFILE',
      tabs: null
    }
  },
  components: {
    Profile,
    Search
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
