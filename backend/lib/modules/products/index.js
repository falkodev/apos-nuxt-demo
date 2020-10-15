module.exports = {
  extend: 'apostrophe-pieces',
  name: 'product',
  alias: 'product',
  restApi: true,
  addFields: [
    {
      name: 'description',
      type: 'string',
      required: true,
    },
    {
      name: 'picture',
      type: 'attachment',
      group: 'images',
    },
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: ['title', 'slug', 'description', 'picture', 'published'],
    },
  ],
  removeFields: ['tags'],
}
