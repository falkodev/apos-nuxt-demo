const path = require('path')
const faker = require('faker')

module.exports = {
  construct(self, options) {
    const req = self.apos.tasks.getReq()

    /**
     * Run with "node app fixtures:all"
     */
    self.addTask('all', 'Run all fixtures', async (apos, argv) => {
      await runBasicUsers()
      await runProducts()
    })

    async function runBasicUsers() {
      try {
        self.apos.log.info('******** Start basic users fixtures ********')
        const removedPieces = await self.apos.docs.db.remove({
          type: 'apostrophe-user',
          username: { $in: ['admin', 'front-app'] },
        })
        const usersCollection = self.apos.db.collection('aposUsersSafe')
        const removedUsers = await usersCollection.remove({ username: { $in: ['admin', 'front-app'] } })
        if (removedPieces.length > 0) {
          self.apos.log.info(`Users "admin" and "front-app" removed: ${removedUsers.result}`)
        }

        let adminGroup = await self.apos.groups.find(req, { title: 'admin' }).permission(false).toObject()
        if (!adminGroup) {
          adminGroup = await self.apos.groups.insert(
            req,
            { title: 'admin', permissions: ['admin'] },
            { permissions: false },
          )
          self.apos.log.info('Admin group created')
        }

        await self.apos.users.insert(
          req,
          {
            username: 'admin',
            password: 'admin',
            title: 'admin',
            firstName: 'admin',
            groupIds: [adminGroup._id],
          },
          { permissions: false },
        )

        await self.apos.users.insert(
          req,
          {
            username: 'front-app',
            password: 'pass01',
            title: 'front-app',
            firstName: 'front-app',
          },
          { permissions: false },
        )
        self.apos.log.info('Users "admin" and "front-app" added')
      } catch (error) {
        self.apos.log.error(`Error in runBasicUsers: ${error.message}`)
      }
    }

    async function runProducts() {
      try {
        self.apos.log.info('******** Start product fixtures ********')

        // Remove pictures and pieces
        const removedAttachments = await self.apos.attachments.db.remove({ name: /dish/ })
        self.apos.log.info(`Images removed: ${removedAttachments}`)
        const removedPieces = await self.apos.docs.db.remove({
          type: 'product',
          id: { $gte: 0, $lte: 10 },
        })
        self.apos.log.info(`Products removed: ${removedPieces}`)

        // Add products
        for (let i = 1; i <= 10; i++) {
          const pictureName = `dish-${i}.jpg`
          const picturePath = path.resolve(__dirname, `./attachments/${pictureName}`)
          const picture = await self.apos.attachments.insert(req, { name: pictureName, path: picturePath })

          await self.apos.product.insert(req, {
            title: `Dish ${i}`,
            description: faker.commerce.productDescription(),
            picture,
            published: true,
            trash: false,
          })
          self.apos.log.info(`Product ${i} added`)
        }
        self.apos.log.info('Products added')
      } catch (error) {
        self.apos.log.error(`Error in runProducts: ${error.message}`)
      }
    }
  },
}
