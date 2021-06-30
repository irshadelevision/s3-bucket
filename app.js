require('dotenv').config()
const express = require('express')
const skipper = require('skipper')
const skipperS3 = require('skipper-s3');
const app = express()
const receiving = skipperS3({
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        endpoint: process.env.S3_ENDPOINT,
        headers: {
          'x-amz-acl': 'full-control'
        }
    })
    .receive();

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(skipper());

app.set('view engine', 'ejs')

app.get('/method1', function (req, res) {
    res.render('index', { url: '/method1'})
})

app.post('/method1', async function (req,res) {

    req.file('avatar').upload(receiving, function onUploadComplete (err, uploadedFiles) {
        if(err) return res.status(500).json(err)
        return res.status(200).json(uploadedFiles)
    })

})

app.get('/method2', function (req, res) {
    res.render('index', { url: '/method2'})
})

app.post('/method2', async function (req,res) {
    const options = { 
        adapter: require('skipper-better-s3'),
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        s3config: {
            endpoint: process.env.S3_ENDPOINT,
        },
        s3params:{
            ACL: 'public-read' // file permision
        },
        onProgress: progress => console.log('Upload progress:', progress)
    }

    req.file('avatar').upload(options, (err, files) => {
        if(err) return res.status(500).json(err)
        return res.status(200).send(files)
    })

})

  
app.listen(PORT, function () {
    console.log('Server listening on port: ', PORT)
})