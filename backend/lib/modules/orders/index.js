module.exports = {
  extend: 'apostrophe-pieces',
  name: 'order',
  alias: 'order',
  restApi: {
    getRequiresEditPermission: true,
  },
  addFields: [
    {
      name: 'status',
      type: 'select',
      choices: [
        {
          value: 'new',
          label: 'New',
        },
        {
          value: 'preparation',
          label: 'Preparation',
        },
        {
          value: 'cancelled',
          label: 'Cancelled',
        },
        {
          value: 'ready',
          label: 'Ready',
        },
      ],
      def: 'new',
      required: true,
    },
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
        },
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
      fields: ['title', 'date', 'status', '_menuItems', '_customer', 'published'],
    },
  ],
  removeFields: ['slug', 'tags'],
  addColumns: [
    {
      name: 'status',
      label: 'Status',
    },
  ],
  addFilters: [
    {
      name: 'status',
      label: 'Status',
    },
  ],
  construct(self, options) {
    self.on('apostrophe:modulesReady', 'openSocket', function () {
      self.apos.app.io.on('connection', socket => {
        socket.on('openCanal', arg => {
          socket.id = arg.id
        })
      })
    })

    self.on('apostrophe-docs:afterUpdate', 'afterUpdateMessage', async (req, piece) => {
      try {
        const sockets = await self.apos.app.io.fetchSockets()
        const socket = sockets.find(s => s.id === piece.customerId)
        if (socket) {
          socket.emit('newStatus', {
            order: piece.title.split(' - ')[1],
            status: piece.status,
            type: piece.status === 'cancelled' ? 'warning' : 'success',
          })
        }
      } catch (error) {
        self.apos.log.error(error)
      }
    })
  },
}
