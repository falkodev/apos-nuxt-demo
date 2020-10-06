<template>
  <v-layout row justify-center>
    <Register :modal="false" />
  </v-layout>
</template>

<script>
import Register from '~/components/Register'

export default {
  components: {
    Register,
  },
  head: {
    titleTemplate: '%s - Login',
  },
}
</script>
