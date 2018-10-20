<template>
  <v-dialog 
    width="350px" 
    persistent
    v-model="editDialog">
    <v-btn accent slot="activator" class="primary">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider> </v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="date" style="width: 100%" actions>
              <template>
                <v-btn class="darken-1" flat @click="editDialog = false">Close</v-btn>
                <v-btn flat @click="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editableDate: null,
      date: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.date).getUTCDate()
      const newMonth = new Date(this.date).getUTCMonth()
      const newYear = new Date(this.date).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      console.log(newDate)
      console.log(this.date)
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created () {
    this.editableDate = new Date(this.meetup.date)
  }
}
</script>
