// Main configuration file (based on node-config)
// See https://github.com/lorenwest/node-config
//
// Be sure to understand the configuration mechanism of node-config before applying
// changes in this file.
//
// If you need to setup a local configuration for your dev environnement you can
// create a ./local.js file with your own overrides. Note, that the local.js
// file does not needs to contains all the configuration keys: just the overrides.
const name = 'apos-nuxt-demo'
const port = 1337

module.exports = {
  shortName: name,

  title: name,

  baseUrl: `http://localhost:${port}`,

  mongo: {
    uri: `mongodb://127.0.0.1:27017/${name}`,
  },

  express: {
    port,
    socketIoPort: 1338,
    session: {
      secret: 'bU3ecHawNSXcsAkgJ9wu2SqPAp',
    },
  },

  membersUsersGroup: 'frontend-user',
}
