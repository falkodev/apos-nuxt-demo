const config = require('config')

module.exports = require('apostrophe')({
  shortName: config.get('shortName'),
  title: config.get('title'),
  baseUrl: config.get('baseUrl'),
  prefix: '/cms',
  modules: {
    'apostrophe-admin-bar': {},
    'apostrophe-areas': {},
    'apostrophe-assets': {
      jQuery: 3,
      stylesheets: [{ name: 'site' }],
    },
    'apostrophe-db': {
      uri: config.get('mongo.uri'),
      connect: {
        useUnifiedTopology: true,
      },
    },
    'apostrophe-express': {},
    'apostrophe-headless': {
      bearerTokens: true,
    },
    'apostrophe-pages': {},
    'columns-layout-widgets': {},
    fixtures: {},
    'link-widgets': {},
    'text-link-widgets': {},
    'menu-items': {},
  },
})
