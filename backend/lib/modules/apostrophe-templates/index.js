module.exports = {
  construct(self, options) {
    self.addHelpers({
      RTEConfig: () => require('config').get('RTEConfig'),
    })
  },
}
