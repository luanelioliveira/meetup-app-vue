<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav" absolute>
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
        >
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <img src="https://2018.montreal.wordcamp.org/files/2018/04/meetup-icon-white.png" alt="" height="40px">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link"
          >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-menu 
          bottom
          left
          v-if="userIsAuthenticated"
          :nudge-width="300"
          absolute
        >
          <v-btn slot="activator" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>    


          <v-card>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" alt="John">
                </v-list-tile-avatar>
    
                <v-list-tile-content>
                  <v-list-tile-title>{{userAuthenticated.displayName}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{userAuthenticated.email}}</v-list-tile-sub-title>
                </v-list-tile-content>
    
              </v-list-tile>
            </v-list>
    
            <v-divider></v-divider>
          
            <v-list>
              <v-list-tile to="/profile">
                <v-list-tile-action>
                  <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>SETTINGS</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="onLogout">Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      fav: true,
      menu: false,
      message: false,
      hints: true
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userAuthenticated () {
      return this.$store.getters.user
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
