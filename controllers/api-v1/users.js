const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../../models')
const requiresToken = require('../requiresToken')


//POST /users/register -- create new user
router.post('/register', async (req,res)=>{
    try{    
        // check if uer exists -- dont allow them to sign up again
        const userCheck = await db.User.findOne({
            email: req.body.email
        })
        //has the password (could validate if we wanted)
        if (userCheck) return res.status(409).json({message: 'that email is already in use'})
        const salt = 12
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //create a user in the db
        const newUser = await db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        //create a jwt payload to send back to the client
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }
        //sign the jwt and send it 
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60*60})
        res.json({token})
    }catch(error){
        res.status(503).json({message: 'error message 503'})
    }
})

//POST /users/login -- validate login credentials
router.post('/login', async (req,res)=>{
    try{
        //find user in the db that is logging in
        const foundUser = await db.User.findOne({
            email: req.body.email
        })
        // if use not found send back message that user needs to sign up
        if(!foundUser) return res.status(404).json({message: 'this user does not exist, sign up first'})
        // check password from the req.body 
        // console.log(req.body.password, foundUser.password)
        const matchedPassword = bcrypt.compare(req.body.password, foundUser.password)
        //if the provided info does not match -- send back error messgae and return 
        if(!matchedPassword) return res.status(404).json({message: 'wrong password'})
        //create jwt payload
        const payload = {
         name: foundUser.name,
         email: foundUser.email,
         id: foundUser.id
        }
        //sign the jwt and send back
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60*60})
        res.json({token})
    }catch (error) {
        res.status(503).json({message: 'error 503'})
    }
})
//GET /users/auth-locked -- example of checking jwt and serving data
router.get('/auth-locked',requiresToken,(req,res)=>{
    console.log(res.locals.user)
    res.json({message: 'welcome to the auth locked route'})

})


module.exports = router

