<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
          <v-card>
              <v-card-title class="title font-weight-regular justify-space-between">
                <span>Sign Up</span>
              </v-card-title>
              <v-card-text>
                  <form @submit.prevent="onSignup()">
                      <v-layout row>
                          <v-flex xs12>
                              <v-text-field
                                  name = "name"
                                  label = "Name"
                                  id = "name"
                                  v-model = "name"
                                  type = "text"
                                  required>
                              </v-text-field>
                          </v-flex>
                      </v-layout>                      
                      <v-layout row>
                          <v-flex xs12>
                              <v-text-field
                                  name = "email"
                                  label = "Email"
                                  id = "email"
                                  v-model = "email"
                                  type = "email"
                                  required>
                              </v-text-field>
                          </v-flex>
                      </v-layout>
                      <v-layout row>
                          <v-flex xs12>
                              <v-text-field
                                  name = "password"
                                  label = "Password"
                                  id = "password"
                                  v-model = "password"
                                  type = "password"
                                  required>
                              </v-text-field>
                          </v-flex>
                      </v-layout>
                      <v-layout row>
                          <v-flex xs12>
                              <v-text-field
                                  name = "confirmPassword"
                                  label = "Confirm Password"
                                  id = "confirmPassword"
                                  v-model = "confirmPassword"
                                  type = "password"
                                  required
                                  :rules="[comparePasswords]">
                              </v-text-field>
                          </v-flex>
                      </v-layout>
                      <v-layout row>
                          <v-flex xs12>
                              <v-btn 
                                type="submit"
                                :disabled = "loading"
                                :loading = "loading"
                              >
                                Sing Up
                                <span slot="loader" class="custom-loader">
                                  <v-icon light>cached</v-icon>
                                </span>
                              </v-btn>
                          </v-flex>
                      </v-layout>
                  </form>
              </v-card-text>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  created () {
    this.$store.dispatch('clearError')
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('signUserUp',
        {
          name: this.name,
          email: this.email,
          password: this.password
        })
    },
    onDismissed () {
      console.log('Dismissed Alert!')
      this.$store.dispatch('clearError')
    }
  }
}
</script>
