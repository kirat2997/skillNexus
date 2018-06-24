<template>
  <div class="hello">
    <v-toolbar dark style="background: #5d91f7;">
      <v-toolbar-title class="white--text">Skill Nexus</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="reset">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container text-xs-center>
      <v-layout>
        <v-flex xs7>
          CONTENT
        </v-flex>

        <v-flex xs5>
          <v-layout>
            <v-flex xs12>
              <v-form ref="form" v-model="valid" lazy-validation style="color: #5d91f7;">
                <v-text-field
                  v-model="name"
                  label="Name"
                  required
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  required
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="roll"
                  :rules="rollRules"
                  label="Roll Number"
                  required
                ></v-text-field>

                <v-select
                  :items="branches"
                  v-model="branch"
                  label="Branch"
                  required
                ></v-select>

                <v-select
                  :items="universities"
                  v-model="university"
                  label="University"
                  required
                ></v-select>
                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  label="Phone Number"
                  required
                ></v-text-field>
                <v-layout justify-space-around>
                  <v-flex xs10>
                    <InputSkill v-for="i in number" :key=i ref="input"></InputSkill>
                  </v-flex>
                  <v-icon style="cursor: pointer; bottom: 0; color: #5d91f7;" v-on:click="increase" large>add_circle_outline</v-icon>
                  <v-icon v-if="number > 1" style="cursor: pointer; bottom: 0; color: #5d91f7;" v-on:click="decrease" large>remove_circle_outline</v-icon>
                
                </v-layout>
                <v-btn
                  :disabled="!valid"
                  @click="submit"
                >
                  submit
                </v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
        :timeout="1000"
        :top="true"
        v-model="snackbar"
      >
        {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import InputSkill from './childComponents/InputSkill'
import { completeSignup } from '../helpers/account'
export default {
  name: 'home',
  data () {
    return {
      valid: true,
      snackbar: false,
      text: '',
      name: '',
      email: '',
      phone: '',
      number: 1,
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v => /\d{10}/.test(v) || 'Phone number must be valid'
      ],
      roll: '',
      rollRules: [
        v => !!v || 'Roll Number is required',
        v => /\d{7}/.test(v) || 'Roll Number must be valid'
      ],
      branch: '',
      branches: ['CSE', 'IT', 'MECH', 'CIVIL', 'EEE', 'EE', 'E&I', 'ETC'],
      university: '',
      universities: ['KIIT University'],
      skills: []
    }
  },
  components: {
    InputSkill
  },
  beforeMount () {
    const user = this.$store.state.user
    this.name = user.name
    this.email = user.email
    if (user.skills.length > 0) {
      this.$router.push('/home')
    }
  },
  methods: {
    increase () {
      this.number += 1
    },
    decrease () {
      if (this.number > 1) {
        this.number -= 1
      }
    },
    reset () {
      this.$store.commit('RESET_STATE')
      this.$router.push('/')
    },
    async submit () {
      const email = this.email
      const rollNo = this.roll
      const branch = this.branch
      const university = this.university
      const contact = this.phone
      let empty = false
      this.$refs.input.forEach(element => {
        if (element.level && element.skill) {
          this.skills.push({name: element.skill, expertise: element.level})
        } else {
          empty = true
        }
      })
      const skills = this.skills
      if (email && rollNo && branch && university && contact && !empty) {
        const res = await completeSignup({rollNo, branch, university, contact, skills})
        if (res) {
          this.$router.push('/home')
        } else {
          this.snackbar = true
          this.text = 'Some Error Occured. Please Try Again'
        }
      } else {
        this.snackbar = true
        this.text = 'Please fill the required fields'
      }
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
