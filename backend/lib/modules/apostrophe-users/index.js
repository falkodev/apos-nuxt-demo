const isEmail = require('validator').isEmail

module.exports = {
  groups: [
    {
      title: 'customer',
      permissions: [''],
    },
    {
      title: 'admin',
      permissions: ['admin'],
    },
  ],
  construct(self, options) {
    self.route('post', 'register', async (req, res) => {
      try {
        if (!req.body.email || !req.body.password) {
          return res.status(400).send('missing parameter')
        }

        const { email, password } = req.body

        if (!isEmail(email)) {
          return res.status(400).send(`email not valid: ${req.body.email}`)
        }

        const userExists = await self.find(req, { username: email }).permission(false).toObject()

        if (userExists) {
          return res.status(400).send('user already exists')
        }

        const group = await self.apos.groups.find(req, { title: 'customer' }).permission(false).toObject()

        await self.apos.users.insert(
          req,
          {
            email,
            password,
            title: email,
            username: email,
            fullName: email,
            groupIds: [group._id],
          },
          { permissions: false },
        )

        return res.status(200).send('success')
      } catch (error) {
        self.apos.log.error('Error in register', error.message)
        return res.status(500).send('error')
      }
    })

    self.route('get', 'check-email/:email', async (req, res) => {
      try {
        if (!isEmail(req.params.email)) {
          return res.status(400).send(`email not valid: ${req.params.email}`)
        }

        const userExists = await self.find(req, { username: req.params.email }).permission(false).toObject()
        res.send({ exists: !!userExists })
      } catch (error) {
        self.apos.log.error(err)
        res.status(500).send('system error')
      }
    })

    self.route('get', 'user', async (req, res) => {
      try {
        if (!req.headers.authorization) {
          throw new Error('missing authorization token')
        }

        const token = req.headers.authorization.split('Bearer ')[1]
        self.bearerTokensCollection = self.apos.db.collection('aposBearerTokens')
        const bearer = await self.bearerTokensCollection.findOne({ _id: token })
        if (bearer) {
          const user = await self.find(req, { _id: bearer.userId }, { _id: 1 }).permission(false).toObject()

          return res.status(200).send(user)
        } else {
          throw new Error('bearer token not found')
        }
      } catch (error) {
        self.apos.log.error(error)
      }
    })
  },
}
