<template>
    <v-container>
        <v-layout row wrap v-if="userIsAuthenticated">
          <v-flex xs12>
            <div class="text-xs-center">
              <h5>{{message}}</h5>
            </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large router to="/meetups" class="primary">Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router to="/meetup/new" class="primary">Organize</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="text-xs-center">
              <v-progress-circular
                indeterminate
                color="primary"
                :width="7"
                :size="70"
                v-if="loading"
              >
                <br />
                <br />
              </v-progress-circular>
            </div>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-2" v-if="!loading">
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                    v-for="meetup in meetups"
                    :key="meetup.id"
                    :src="meetup.imageUrl"
                    tag="span" 
                    style="cursor: pointer"
                    @click="onLoadMeetup(meetup.id)"
                    >
                    <div class="title">
                        {{ meetup.title }}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-2">
            <v-flex xs12 class="text-xs-center">
                <p>Join Our Awesome Meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    message () {
      let name = this.userAuthenticated.displayName.split(' ')
      return `Welcome ` + name[0] + `!`
    },
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userAuthenticated () {
      return this.$store.getters.user
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
  .title {
      position: initial;
      text-align: center;
      bottom: 50px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 2em;
      padding: 20px;
  }
</style>
