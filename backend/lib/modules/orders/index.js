module.exports = {
  extend: 'apostrophe-pieces',
  name: 'order',
  alias: 'order',
  restApi: {
    getRequiresEditPermission: true,
  },
  addFields: [
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: '_products',
      type: 'joinByArray',
      required: true,
    },
    {
      name: '_customer',
      type: 'joinByOne',
      withType: 'apostrophe-user',
      required: true,
    },
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: ['title', 'date', '_products', '_customer', 'published'],
    },
  ],
  removeFields: ['slug', 'tags'],
}
