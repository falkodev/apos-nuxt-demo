apos.define('apostrophe-rich-text-widgets-editor', {
  construct: function (self, options) {
    self.options = {
      toolbar: [
        'Styles',
        'Bold',
        'Italic',
        'JustifyLeft',
        'JustifyRight',
        'JustifyCenter',
        'Link',
        'Unlink',
        'Undo',
        'Redo',
        ...(options.toolbar || []),
      ],
      styles: [
        { name: 'Body', element: 'p' },
        {
          name: 'Homepage Color',
          element: 'p',
          styles: { 'font-size': '32px', color: '#6B5DFF' },
        },
        ...(options.styles || []),
      ],
    }
  },
})
