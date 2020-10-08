module.exports = {
  mongo: {
    uri: process.env.MONGODB || `mongodb://127.0.0.1:27017/${name}`,
  },
}
