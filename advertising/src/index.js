const express = require('express')
const mongodb = require('mongodb')

const app = express()
const PORT = process.env.PORT
const DBHOST = process.env.DBHOST
const DBNAME = process.env.DBNAME

let advertisingDb

mongodb.MongoClient.connect(DBHOST, { useUnifiedTopology: true })
    .then((client) => {
        advertisingDb = client.db(DBNAME)
    })

app.get('/advertising', (req, res) => {
    const advertises = advertisingDb.collection('advertise')
    advertises.find().toArray().then((advertises) => {
        const ad = advertises[Math.floor(Math.random() * advertises.length)];
        res.json(ad)
    })
})

app.listen(PORT, () => {
    console.log('Advertising service is on port ' + PORT)
})