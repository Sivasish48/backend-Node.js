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

app.post("/admin/signup", (req,res)=>{
   
   const admin = req.body
   console.log(req.body);
   const existingAdmin = ADMINS.find((a)=>(a.username === admin.username))

   if (existingAdmin){
      res.json({message:"The admin aleady exists"})
   } else{
   ADMINS.push(admin)
  const token =  generateJwt(admin)    // generates a JSON Web Token (JWT) for the newly created admin.
  res.json({message:"The admin created successfuly"})
   }
})

app.post("/admin/login", (res,req)=>{
   const { username, password } = req.headers;
   const admin = ADMINS.find(a => a.username === username && a.password === password);
 
     if(admin){
      const token = generateJwt(admin)
      res.json({message:"logged in successfuly"})
     }
})


