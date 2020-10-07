const cors = require('cors')
const config = require('config')
const helmet = require('helmet')

module.exports = {
  beforeConstruct(self, options) {
    options.apos.log = require('pino')({ prettyPrint: true })
  },
  port: config.get('express.port'),
  session: {
    secret: config.get('express.session.secret'),
  },
  csrf: {
    exceptions: [
      '/modules/apostrophe-users/register',
      '/modules/apostrophe-users/new-email',
      '/modules/apostrophe-users/unregister',
      '/modules/apostrophe-users/update-password',
      '/modules/apostrophe-users/reset-password',
      '/reset-password-confirm',
    ],
  },
  middleware: [
    cors({
      origin: [/0\.0\.0\.0/, /localhost/],
    }),
    helmet({
      frameguard: {
        action: 'sameorigin',
      },
      contentSecurityPolicy: false,
    }),
  ],
}
