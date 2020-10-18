<template>
  <v-app>
    <Nav />
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
import Nav from '~/components/Nav.vue'
import Snackbar from '~/components/Snackbar.vue'

export default {
  components: {
    Nav,
    Snackbar,
  },
  mounted() {
    if (this.$auth.$storage.getUniversal('_id')) {
      this.$auth.setUser({
        _id: this.$auth.$storage.getUniversal('_id'),
        email: this.$auth.$storage.getUniversal('email'),
      })
    }
  },
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
