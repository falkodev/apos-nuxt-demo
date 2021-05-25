<template>
  <v-app>
    <Nav @logout="socket.disconnect()" />
    <v-main>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <nuxt />
          <Snackbar />
        </v-layout>
      </v-container>
    </v-main>
    <v-footer app />
  </v-app>
</template>

<script>
import io from 'socket.io-client'
import { mapActions } from 'vuex'
import Nav from '~/components/Nav.vue'
import Snackbar from '~/components/Snackbar.vue'

export default {
  components: {
    Nav,
    Snackbar,
  },

  data() {
    return {
      socket: io('localhost:1338'),
    }
  },

  mounted() {
    if (this.$auth.$storage.getUniversal('_id')) {
      this.$auth.setUser({
        _id: this.$auth.$storage.getUniversal('_id'),
        email: this.$auth.$storage.getUniversal('email'),
      })
    }

    this.$root.$on('login', () => {
      this.socket = io('localhost:1338', { transports: ['websocket'] })

      this.socket.emit('openCanal', {
        id: this.$store.state.auth.user._id,
      })

      this.socket.on('newStatus', async data => {
        this.displaySnack({ message: `New status for order ${data.order}: ${data.status}`, color: data.type })
      })
    })
  },

  methods: mapActions('snackbar', ['displaySnack']),
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';
@import '~/assets/scss/_functions.scss';

body {
  background: $lightgrey;
  color: $color-dark;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 1.2;
  margin: 0;
}

.container {
  padding: 0;
}

.btn {
  background: $color-light;
  border: 1px solid $color-dark;
  border-radius: 4px;
  color: find-best-text-color($color-light);
  cursor: pointer;
  font-size: 16px;
  height: 20px;
  margin-top: 20px;
  padding: 18px;
  text-align: center;
  text-decoration: none;
}

*,
*:before,
*:after {
  box-sizing: content-box;
  margin: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
