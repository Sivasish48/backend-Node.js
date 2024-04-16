const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()

const port = 3002

app.use(express.json())


let ADMINS = []
let USERS = []
let COURSES = []


const secret = "jhsvhjgjhggkjgkjgjgmjb,jhjghmfkfgjfnbnvghghjfkyfuisoicjdicjd"

// now let us create a function to generate jwt 


const generateJwt = (user)=>{


   // create a onject to store the username of the user

   const payload = {
    username:user.username
   }
   return jwt.sign(payload,secret,{expiresIn:'1h'})

}

app.get


