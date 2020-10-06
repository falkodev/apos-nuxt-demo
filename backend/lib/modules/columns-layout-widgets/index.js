module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Columns Layout',
  contextualOnly: false,
  beforeConstruct: function (self, options) {
    options.addFields = [
      {
        name: 'columns',
        label: 'Columns layout',
        type: 'select',
        required: true,
        choices: [
          {
            label: '1 column',
            value: '1',
          },
          {
            label: '2 columns',
            value: '2',
          },
          {
            label: '3 columns',
            value: '3',
          },
        ],
      },
      {
        name: 'column1',
        type: 'area',
        label: 'Column 1',
        contextual: true,
      },
      {
        name: 'column2',
        type: 'area',
        label: 'Column 2',
        contextual: true,
      },
      {
        name: 'column3',
        type: 'area',
        label: 'Column 3',
        contextual: true,
      },
    ].concat(options.addFields || [])
  },
  construct: function (self, options) {
    const superPushAssets = self.pushAssets
    self.pushAssets = function () {
      superPushAssets()
      self.pushAsset('stylesheet', 'always', { when: 'always' })
    }
  },
}
