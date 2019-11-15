const mongoose = require('mongoose')
const { mongoUrl } = require('../.env')


mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
            .catch( err => {
                const msg = 'Unable to connect to MongoDB'
                console.log('\x1b[41m%s\x1b[37m', msg,'\x1b[0m')
            })