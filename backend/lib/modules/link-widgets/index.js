module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Link',
  addFields: [
    {
      name: 'text',
      label: 'Text',
      type: 'string',
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'url',
      required: true,
    },
    {
      name: 'linkType',
      type: 'select',
      choices: [
        {
          value: 'a',
          label: 'Href Link',
        },
        {
          value: 'button',
          label: 'Button',
          showFields: ['largeButton', 'buttonStyle'],
        },
      ],
    },
    {
      name: 'buttonLarge',
      type: 'boolean',
      choices: [
        {
          value: false,
          showFields: ['buttonPosition'],
        },
      ],
    },
    {
      name: 'buttonPosition',
      type: 'select',
      choices: [
        {
          value: 'left',
          label: 'Left',
        },
        {
          value: 'center',
          label: 'Center',
        },
        {
          value: 'right',
          label: 'Right',
        },
      ],
      def: 'center',
    },
    {
      name: 'buttonStyle',
      type: 'select',
      choices: [
        {
          value: 'standard',
          label: 'Standard',
          showFields: ['bgColor'],
        },
        {
          value: 'outlined',
          label: 'Outlined',
        },
      ],
    },
    {
      name: 'textColor',
      type: 'color',
      def: '#000000',
    },
    {
      name: 'bgColor',
      label: 'Background Color',
      type: 'color',
      def: '#6B5DFF',
    },
    {
      name: 'lineColor',
      label: 'Background Around Link',
      type: 'color',
      def: '#fff',
    },
    {
      name: 'boldFont',
      type: 'boolean',
      def: false,
    },
    {
      name: 'newWindow',
      label: 'Open In New Tab?',
      type: 'boolean',
    },
    {
      name: 'noFollow',
      label: 'Add nofollow attribute to link',
      type: 'boolean',
    },
  ],
  construct: function (self, options) {
    const superPushAssets = self.pushAssets
    self.pushAssets = function () {
      superPushAssets()
      self.pushAsset('stylesheet', 'always', { when: 'always' })
    }
  },
}
