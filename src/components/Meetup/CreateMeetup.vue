<template>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h2 class="secondary--text">Create a New Meetup</h2>
        </v-flex>  
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onCreateMeetup">
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    prepend-icon="forum"
                    v-model="title"
                    required>
                  </v-text-field>    
                </v-flex>  
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    name="location"
                    label="Location"
                    id="location"
                    prepend-icon="location_on"
                    v-model="location"
                    required>
                  </v-text-field>    
                </v-flex>  
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    name="imageUrl"
                    label="Imagem URL"
                    id="image-url"
                    prepend-icon="insert_photo"
                    v-model="imageUrl"
                    required>
                  </v-text-field>    
                </v-flex>  
              </v-layout>
              <v-layout row v-if="imageUrl">
                <v-flex xs12 sm6 offset-sm3>
                  <img :src="imageUrl" alt="" height="100px">
                </v-flex>  
              </v-layout>
              <v-layout row class="mb-2">
                <v-flex xs12 sm6 offset-sm3>
                  <v-menu
                    ref="menu1"
                    :close-on-content-click="false"
                    v-model="menu1"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="dateFormatted"
                      label="Event's Date"
                      persistent-hint
                      prepend-icon="event"
                      @blur="date = parseDate(dateFormatted)"
                    >
                    </v-text-field>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    v-model="menu2"
                    :nudge-right="40"
                    :return-value.sync="time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="time"
                      label="Event's Time"
                      prepend-icon="access_time"
                      readonly
                    >
                    </v-text-field>
                    <v-time-picker
                      v-if="menu2"
                      v-model="time"
                      format="24hr"
                      full-width
                      @change="$refs.menu.save(time)"
                    >
                    </v-time-picker>
                  </v-menu>  
                </v-flex>
              </v-layout>    
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    prepend-icon="subject"
                    v-model="description"
                    multi-line
                    required>
                  </v-textarea>    
                </v-flex>  
              </v-layout>              
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-btn  
                    round 
                    class="primary" 
                    type="submit"
                    :disabled="!formIsValid">
                    
                    Create Meetup
                  </v-btn>
                </v-flex>  
              </v-layout>
          </form>  
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: null,
      time: null,
      dateFormatted: null,
      menu1: false,
      menu2: false
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== '' &&
        (this.date !== '' && this.date !== null) &&
        (this.time !== '' && this.time !== null)
    },
    submittableDatatime () {
      const date = new Date(this.date)
      if (this.time != null) {
        if (typeof this.time === 'string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
      }
      return date
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDatatime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>
