<template>
  <v-layout row>
    <Login :modal="false" />
  </v-layout>
</template>

<script>
import Login from '~/components/Login'

export default {
  components: {
    Login,
  },
  head: {
    titleTemplate: '%s - Login',
  },
}
</script>
