const router = require('express').Router()
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://scode:admin@cluster0-6bmqd.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(bodyParser.raw())

client.connect(err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Connected to mongodb')
    const db = client.db('test')

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

    router.post('/api/add/post', (req, res) => {
      db.collection('posts').insertOne(req.body, (err, data) => {
          if(err) return console.log(err);
          res.send((req.body));
      })
    })
  }
})

module.exports = router
