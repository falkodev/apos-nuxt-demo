module.exports = {
  restApi: true,
  apiTemplates: ['front-homepage'],
  types: [
    {
      name: 'front-homepage',
      label: 'Front Homepage',
    },
  ],
  construct: function(self, options) {
    var superPushAssets = self.pushAssets
    self.pushAssets = function() {
      superPushAssets()
      self.pushAsset('stylesheet', 'always', { when: 'always' })
    }

    self.on('apostrophe-pages:beforeSend', 'environment', req => {
      req.data.baseUrl = process.env.BASE_URL
    })
  },
}
