const config = require('config')

const apos = require('apostrophe')({
  shortName: config.get('shortName'),
  title: config.get('title'),
  baseUrl: config.get('baseUrl'),
  prefix: '/api',
  modules: {
    'apostrophe-admin-bar': {},
    'apostrophe-areas': {},
    // 'apostrophe-assets': {
    //   stylesheets: [{ name: 'site' }],
    // },
    'apostrophe-db': {
      uri: config.get('mongo.uri'),
    },
    'apostrophe-express': {},
    'apostrophe-headless': {
      bearerTokens: true,
      // apiKeys: [],
    },
    'apostrophe-pages': {},
    'columns-layout-widgets': {},
    fixtures: {},
    'link-widgets': {},
    'text-link-widgets': {},
  },
})

module.exports = apos
