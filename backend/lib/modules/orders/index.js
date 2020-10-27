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
      name: '_menuItems',
      type: 'joinByArray',
      withType: 'menu-item',
      required: true,
      relationship: [
        {
          name: 'quantity',
          label: 'Quantity',
          type: 'integer',
        }
      ],
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
      fields: ['title', 'date', '_menuItems', '_customer', 'published'],
    },
  ],
  removeFields: ['slug', 'tags'],
}
