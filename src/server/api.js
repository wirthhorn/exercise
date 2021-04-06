const router = require('express').Router()

const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb://adminwuh:#42#@10.10.10.21:27017'

const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

client.connect(err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Connected to mongodb')
    const db = client.db('exercise')

    // Get posts from MongoDB
    router.get('/api/posts', (req, res) => {
      // Query data from MongoDB
      db.collection('posts').find({}).toArray((err, posts) => {
        if (err) {
          console.error(err)
        }
        // Return data as JSON
        res.json(posts)
      })
    })
  }
})

module.exports = router
