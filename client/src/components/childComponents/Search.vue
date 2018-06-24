<template>
  <div class="hello">
    <v-container grid-list-xl>
      <!-- <div v-for="user in users" :key="user._id">{{ user.name }}</div> -->
      <v-layout v-bind="binding">
        <v-flex xs12>
          SEARCH PEOPLE
        </v-flex>
        <v-flex xs6>
          <p class="title">Recommendations</p>
          <v-list three-line dense>
            <template v-for="item in users">
              <v-list-tile :key="item._id" avatar style="height:120px;">
                <v-list-tile-avatar>
                  <img src="/static/img/default.png">
                </v-list-tile-avatar>
                <v-list-tile-content style="overflow: visible;">
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.university"></v-list-tile-sub-title>
                  <v-layout>
                    <v-flex xs6>
                      <v-btn style="color: white; background:#5d91f7">Compete</v-btn>
                    </v-flex>
                    <v-flex xs6> 
                      <v-btn style="color: white; background:#5d91f7">Connect</v-btn>
                    </v-flex>
                  </v-layout>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :inset="true" :key="item.name"></v-divider>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { recommend } from '../../helpers/account'
export default {
  name: 'search',
  data () {
    return {
      users: []
    }
  },
  async mounted () {
    this.users = await recommend()
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
