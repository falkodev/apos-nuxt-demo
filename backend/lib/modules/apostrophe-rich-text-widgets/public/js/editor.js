apos.define('apostrophe-rich-text-widgets-editor', {
  construct: function (self, options) {
    self.options = {
      toolbar: ['Scayt', 'Styles', 'Bold', 'Italic', 'Link', 'Unlink', 'Undo', 'Redo', ...(options.toolbar || [])],
      styles: [
        { name: 'Body', element: 'p' },
        { name: 'Purple', element: 'p', styles: { color: '#6200EE' } },
        { name: 'Homepage color', element: 'p', styles: { color: '#6B5DFF' } },
        { name: 'Centered Paragraph', element: 'p', styles: { 'text-align': 'center' } },
        { name: 'Centered Purple', element: 'p', styles: { 'text-align': 'center', color: '#6200EE' } },
        { name: 'Centered Homepage Color', element: 'p', styles: { 'text-align': 'center', color: '#6B5DFF' } },
        { name: 'Big Size', element: 'p', styles: { 'font-size': '32px' } },
        { name: 'Big Size Purple', element: 'p', styles: { 'font-size': '32px', color: '#6200EE' } },
        { name: 'Big Size Homepage Color', element: 'p', styles: { 'font-size': '32px', color: '#6B5DFF' } },
        { name: 'Centered Big Size', element: 'p', styles: { 'font-size': '32px', 'text-align': 'center' } },
        {
          name: 'Centered Big Size Purple ',
          element: 'p',
          styles: { 'font-size': '32px', 'text-align': 'center', color: '#6200EE' },
        },
        {
          name: 'Centered Big Size Homepage Color ',
          element: 'p',
          styles: { 'font-size': '32px', 'text-align': 'center', color: '#6B5DFF' },
        },
        {
          name: 'Background Color',
          element: 'p',
          styles: { margin: '0 -25%', background: '#6B5DFF', color: 'white' },
        },
        {
          name: 'Background Color Centered',
          element: 'p',
          styles: { margin: '0 -25%', 'text-align': 'center', background: '#6B5DFF', color: 'white' },
        },
        {
          name: 'Background Color Big Size',
          element: 'p',
          styles: { margin: '0 -25%', 'font-size': '32px', background: '#6B5DFF', color: 'white' },
        },
        {
          name: 'Right Background Color Big Size',
          element: 'p',
          styles: {
            padding: '0 20px',
            'margin-right': '-20px',
            'font-size': '32px',
            background: '#6B5DFF',
            color: 'white',
          },
        },
        {
          name: 'Left Background Color Big Size',
          element: 'p',
          styles: {
            padding: '0 20px',
            'margin-left': '-20px',
            'font-size': '32px',
            background: '#6B5DFF',
            color: 'white',
          },
        },
        {
          name: 'Right Centered Background Color Big Size',
          element: 'p',
          styles: {
            'text-align': 'center',
            'margin-right': '-20px',
            'font-size': '32px',
            background: '#6B5DFF',
            color: 'white',
          },
        },
        {
          name: 'Left Centered Background Color Big Size',
          element: 'p',
          styles: {
            'text-align': 'center',
            'margin-left': '-20px',
            'font-size': '32px',
            background: '#6B5DFF',
            color: 'white',
          },
        },
        {
          name: 'Left Background Color',
          element: 'p',
          styles: { 'margin-left': '-20px', background: '#6B5DFF', color: 'white' },
        },
        {
          name: 'Right Background Color',
          element: 'p',
          styles: { 'margin-right': '-20px', background: '#6B5DFF', color: 'white' },
        },
        {
          name: 'Background Color Big Size Centered',
          element: 'p',
          styles: {
            margin: '0 -25%',
            'text-align': 'center',
            'font-size': '32px',
            background: '#6B5DFF',
            color: 'white',
          },
        },
        ...(options.styles || []),
      ],
    }

    self.beforeCkeditorInline = function () {
      // self.config.disableNativeSpellChecker = false; // => if browser spell checker is needed instead of Scayt
      const country = window.document.location.hostname.split('.')[1]
      self.config.scayt_autoStartup = true
      self.config.scayt_sLang = country === 'it' ? 'it_IT' : 'en_GB'
    }
  },
})
