<template>
  <v-layout row justify-center>
    <v-btn class="activator" text @click="dialog = true">
      Register
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px" :fullscreen="$vuetify.breakpoint.mdAndDown">
      <client-only>
        <Register :modal="true" :close="close" />
      </client-only>
    </v-dialog>
  </v-layout>
</template>

<script>
import Register from '~/components/Register'

export default {
  components: {
    Register,
  },

  props: {
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
button.v-btn.v-btn--text.activator {
  height: 100%;
  min-height: 40px;
}
</style>
