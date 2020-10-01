<template>
  <div class="container">
    <h1>An error occurred</h1>
    <p>{{ error.message }}</p>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: { error: { type: Object, default: () => ({ message: '' }) } },
}
</script>
