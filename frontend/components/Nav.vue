<template>
  <v-app-bar app hide-on-scroll flat>
    <!-- small mobile screens only -->
    <template v-if="$vuetify.breakpoint.xsOnly">
      <v-menu offset-y>
        <template #activator="{ on }">
          <v-app-bar-nav-icon v-on="on" />
        </template>
        <v-list>
          <v-list-item>
            <v-btn class="v-btn--mobile v-btn--home" text to="/" nuxt block> Home </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- large smartphones, tablets and desktop view -->
    <template v-else>
      <v-toolbar-items>
        <v-btn class="v-btn--home" text to="/" nuxt> Home </v-btn>
      </v-toolbar-items>
    </template>

    <v-spacer />

    <v-toolbar-items>
      <template v-if="auth.loggedIn">
        <v-btn text>My Order</v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </template>
      <template v-else>
        <RegisterModal />
        <LoginModal :redirect-to="$route.fullPath" />
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import LoginModal from '~/components/LoginModal'
import RegisterModal from '~/components/RegisterModal'

export default {
  components: {
    LoginModal,
    RegisterModal,
  },

  computed: {
    ...mapState(['auth']),
  },

  methods: {
    logout() {
      this.$auth.logout()
      this.$auth.$storage.setUniversal('_id', null)
      this.$auth.$storage.setUniversal('email', null)
      this.$auth.$storage.setState('loggedIn', false)
      this.$auth.$storage.setState('user', false)
    },
  },
}
</script>

<style lang="scss">
.v-btn--mobile:hover {
  height: 100%;
}
.v-btn--home::before {
  opacity: 0 !important;
}
.v-toolbar__content {
  padding: 0 !important;
}
</style>
