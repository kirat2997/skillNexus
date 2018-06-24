<template>
  <div class="hello">
    <v-layout>
      <v-flex xs6>
        <v-text-field
          v-model="skill"
          label="Skill"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs5 offset-xs1>
        <v-select
          :items="levels"
          v-model="level"
          label="Expertise Level"
          required
        ></v-select>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'inputskill',
  data () {
    return {
      skill: null,
      level: null,
      levels: ['Beginner', 'Intermediate', 'Expert']
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
