<template>
  <v-app-bar app hide-on-scroll flat>
    <!-- small mobile screens only -->
    <template v-if="$vuetify.breakpoint.xsOnly">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on" />
        </template>
        <v-list>
          <v-list-item>
            <v-btn class="v-btn--mobile" text to="/" nuxt block>
              Home
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- large smartphones, tablets and desktop view -->
    <template v-else>
      <v-toolbar-items>
        <v-btn text to="/" nuxt>
          Home
        </v-btn>
      </v-toolbar-items>
    </template>

    <v-spacer />

    <v-toolbar-items>
      <template v-if="auth.loggedIn">
        <v-btn text to="/account-dashboard" nuxt>
          My account
        </v-btn>
        <v-btn text @click="logout">
          Logout
        </v-btn>
      </template>
      <template v-else>
        <RegisterModal />
        <LoginModal :redirect-to="$route.fullPath" />
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import LoginModal from '~/components/LoginModal'
import RegisterModal from '~/components/RegisterModal'

export default {
  components: {
    LoginModal,
    RegisterModal,
  },

  computed: mapState(['auth']),

  methods: {
    ...mapMutations(['setLogged', 'setProfile']),

    async logout() {
      await this.$auth.logout()
      this.setLogged(false)
      this.setProfile({})
    },
  },
}
</script>

<style lang="scss">
.v-btn--mobile:hover {
  height: 100%;
}
</style>
