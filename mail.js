const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox14b88584494a45ffabc037048171db61.mailgun.org'
const mg = mailgun({
    apiKey: '1166731aee0bdeec1494853c02bada04-7efe8d73-da31e745',
    domain: DOMAIN
})

// const data = {
//     from: 'contact@korbboon.com',
//     to: 'yee2542gtl@gmail.com',
//     subject: 'hello',
//     text: 'test ja'
// }

// mg.messages().send(data, (err, body) => {
//     console.log(body)
//     // return body
// })


// module.exports = {
//     api: () => {

//     },
//     test: () => {

//     }
// }

module.exports = (header = {
    from: '',
    to: '',
    subject: '',
    text: ''
}) => {
    mg.messages().send(header, (err, body) => {
        if(err) throw new Error(err)
        console.log('send email to', header.to)
        return body
    })
}