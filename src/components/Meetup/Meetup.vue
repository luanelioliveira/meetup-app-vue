<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12>
        <div class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"            
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{ meetup.title }}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup">
              </app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px"
          >
          </v-card-media>
          <v-card-text>
            <h6>{{ meetup.date | date }} - {{ meetup.location }} <v-icon>location_on</v-icon></h6>
            <div v-if="userIsCreator">
              <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>
            </div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions v-if="userIsCreator">
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

