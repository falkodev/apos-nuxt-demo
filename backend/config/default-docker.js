module.exports = {
  mongo: {
    baseUrl: process.env.BASE_URL || `http://localhost:${port}`,
    uri: process.env.MONGODB || `mongodb://127.0.0.1:27018/${name}`,
  },
}
