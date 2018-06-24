<template>
  <div class="hello">
    <v-container grid-list-xl>
      <v-layout v-bind="binding">
        <v-flex xs12>
          <v-avatar
            :tile="true"
            :size="200"
            color="grey lighten-4"
          >
            <img src="/static/img/default.png" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs12 style="text-align:left">
          <h2>{{name}}</h2>
          <p>{{email}}</p>
        </v-flex>
      </v-layout>

      <v-layout v-bind="binding" style="text-align:left; padding-top:12vh; overflow-x: scroll">
        <v-flex v-for="skill in skills" :key="skill._id" xs3>
          <v-card style="padding: 2vh">
            <h3>{{skill.name}}</h3>
            <p>{{skill.expertise}}</p>
            <p>Level - {{skill.level}}</p>
            <v-btn v-if="skill.authenticated" style="width: 95%; background: #5d91f7; color: white;">Upgrade Level</v-btn>
            <v-btn v-else style="width: 95%; background: #5d91f7; color:white;">Authenticate</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      name: '',
      email: '',
      skills: []
    }
  },
  mounted () {
    const user = this.$store.state.user
    this.name = user.name
    this.email = user.email
    this.skills = user.skills
  },
  computed: {
    binding () {
      const binding = {}
      binding.column = true
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false
      return binding
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
