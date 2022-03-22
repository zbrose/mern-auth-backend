require('./models')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8000

//middleware
app.use(cors())
app.use(express.json())

const myMiddleWare = (req,res,next) => {
    
   next() 
}

app.use(myMiddleWare)

app.use('/api-v1/users', require('./controllers/api-v1/users.js'))

app.get('/', myMiddleWare, (req,res) => {
    res.json({message: 'welcome to the user app'})
})

app.listen(PORT, ()=>{
    console.log('PORT 8000')
})

