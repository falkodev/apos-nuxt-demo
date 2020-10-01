<template>
  <transition :css="false" @before-enter="enter">
    <v-snackbar :value="show" :color="color" :timeout="timeout" :top="top" :bottom="bottom">
      <label>{{ message }}</label>
      <v-btn color="white" text @click.native="resetSnack">
        <v-icon class="outlined" small @click.native="resetSnack">
          close
        </v-icon>
      </v-btn>
    </v-snackbar>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: mapState('snackbar', ['message', 'show', 'color', 'timeout', 'top', 'bottom']),
  methods: {
    ...mapMutations('snackbar', ['resetSnack']),
    enter(el) {
      // since vuetify2 removed snackbar slide animation, reproduce it in CSS and manage duration from JS
      el.style.setProperty('--d', `${this.timeout / 1000}s`)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-snack--top {
  top: 0px;
  animation: slideTop var(--d, 6s) ease;
}
.v-snack--bottom {
  bottom: 0px;
  animation: slideBottom var(--d, 6s) ease;
}

@keyframes slideTop {
  0% {
    top: -65px;
  }
  10%,
  90% {
    top: 0px;
  }
  100% {
    top: -65px;
  }
}
@keyframes slideBottom {
  0% {
    bottom: -65px;
  }
  10%,
  90% {
    bottom: 0px;
  }
  100% {
    bottom: -65px;
  }
}
</style>
