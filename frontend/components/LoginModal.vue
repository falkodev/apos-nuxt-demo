<template>
  <v-layout row justify-center>
    <v-btn v-show="!userEmail" class="activator" :block="block" :class="classes" text @click="dialog = true"> {{ label }} </v-btn>
    <v-dialog v-model="dialog" max-width="600px" :fullscreen="$vuetify.breakpoint.mdAndDown">
      <!-- prettier-ignore -->
      <client-only>
        <Login :modal="true" :close="close" :user-email="userEmail" :redirect-to="redirectTo" />
      </client-only>
    </v-dialog>
  </v-layout>
</template>

<script>
import Login from '~/components/Login'

export default {
  components: {
    Login,
  },

  props: {
    label: {
      type: String,
      default: 'Login',
    },
    classes: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
    userEmail: {
      type: String,
      default: '',
    },
    redirectTo: {
      type: String,
      default: '',
    },
  },

  data: function () {
    return {
      dialog: false,
    }
  },

  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
// only for the button in the toolbar menu
.v-toolbar__items .v-btn.v-btn--flat.activator {
  height: 100%;
  min-height: 40px;
}

.v-btn--block {
  flex: 0;
  min-width: 87% !important;
}
</style>
