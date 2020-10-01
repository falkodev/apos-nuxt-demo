<template>
  <v-layout row justify-center>
    <Register :modal="false" />
  </v-layout>
</template>

<script>
import Register from '~/components/Register'

export default {
  head: {
    titleTemplate: '%s - Login',
  },

  components: {
    Register,
  },
}
</script>
