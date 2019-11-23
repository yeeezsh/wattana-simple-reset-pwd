const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const Encrypt = require('./cipher-iv')
const encrypt = new Encrypt()
const mail = require('./mail')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser())

app.get('/reset', (req, res) => {
    try {
        const key = req.query.key
        const decrypt = encrypt.decrypt(key)
        // res.send(decrypt)
        res.redirect('http://google.com')
    } catch (err) {
        res.send('not valid key')
    }
})

const HOST = 'http://localhost:3000'
app.post('/reset', (req, res) => {
    console.log(req.body)
    const { email } = req.body
    const key = encrypt.encrypt({
        email
    })

    const link = HOST + '/reset?key=' + key
    const header = {
        to: email,
        from: 'noreply@service.com',
        text: link,
        subject: 'reset password'
    }
    // not sequnce running
    mail(header)
    return res.send('check you email')
})



app.listen(3000, () => {
    console.log('server start at 3000')
})