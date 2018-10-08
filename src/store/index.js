import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          'https://media.nature.com/w800/magazine-assets/d41586-018-06941-w/d41586-018-06941-w_16129226.jpg',
        id: 'asd12313asddf324fsd342efs',
        title: 'Meetup in New York',
        date: '2018-10-01',
        location: 'New York',
        description: 'New York, New York'
      },
      {
        imageUrl:
          'https://abrilviagemeturismo.files.wordpress.com/2016/11/thinkstockphotos-4549879531.jpeg',
        id: '12313sadad132213',
        title: 'Meetup in Paris',
        date: '2018-10-02',
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ],
    user: {
      id: '1123adasd1233',
      registredMeetups: ['12313sadad132213']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'd123213ds'
      }
      // Reach out to firebase and store it
      commit('createMeetup', meetup)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
