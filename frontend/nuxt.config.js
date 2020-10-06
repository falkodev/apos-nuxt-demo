const pkg = require('./package')

const server = {
  port: 3333,
  host: '0.0.0.0',
}

module.exports = {
  server,

  env: {
    server,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Demo App',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#333' },

  /*
   ** Global CSS
   */
  css: ['~assets/scss/main.scss'],

  buildModules: ['@nuxtjs/vuetify'],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://localhost:1337',
  },

  auth: {
    plugins: ['~/plugins/auth.js'],
    rewriteRedirects: true,
    fullPathRedirect: true,
    watchLoggedIn: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/v1/login', method: 'post', propertyName: 'bearer' },
          logout: { url: '/api/v1/logout', method: 'post' },
          user: { url: '/modules/apostrophe-users/logged', method: 'get', propertyName: false },
        },
      },
    },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
  },
}
