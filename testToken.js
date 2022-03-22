const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtTest = async () =>{
    try{
        const payload = {
            name: 'test user',
            id: 'password',
            email: 'email@email.com'
        }
        const secret = 'my secret'
        const token = jwt.sign(payload, secret, {expiresIn: 60*60}) // expires in how long the token is good for
        console.log(token)
        // decode the jwt 
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode)
    } catch (err) {
        console.log(err)
    }
}

jwtTest()
// DO NOT put password in the token