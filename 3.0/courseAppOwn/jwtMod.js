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


// the below is a function to generate jwt
const generateJwt = (user)=>{


   // create a onject to store the username of the user

   const payload = {
    username:user.username
   }
   return jwt.sign(payload,secret,{expiresIn:'1h'})

}


//now we have to write the middleware function to verify the jwt for the admin

const adminAuthJWT = (req,res,next) =>{
   //let us create a variable to store the authorixation from the header
   const authHeader = req.headers.authorization
   // This specifically retrieves the value of the Authorization header from the request headers.
   //  In the context of JWT-based authentication, this header typically contains the JWT token that the client sends to the server for authentication.
   // for example   ->>   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


   if (authHeader){
      const token = authHeader.split(" ")[1]

      jwt.verify(token,secret,(err,user)=>{
         if(err){
            return res.sendStatus(403)
         }
         req.user = user
         next()
         
      })
   }else{
      res.sendStatus(401)
   }
   

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



// now the code to create course by the admin
app.post("/admin/courses", adminAuthJWT , (req,res)=>{
     
  

   let course = req.body

   // and the identification of the course will be defined by an unique id
   
   course.id=Date.now()

   // now put the course variable into the global COURSE variable

   COURSES.push(course)
   res.json({ message:"The course is created successfully"})
  })




  // to edit the course created by the admin
  app.put("/admin/courses/:courseId", adminAuthJWT , (req,res)=>{

   // let us store the course Id from the querry params and convert it into a number (it might be a string)
      let courseId = parseInt(req.params.courseId)
      
      // now let us store the logic in a variable of whether the given course id exists or not
      let course = COURSES.find((c)=>( c.id === courseId ))

      // now let us put the logic if we find out the ccourse id exists
        if(course){

           Object.assign(course,req.body)

           // The Object.assign method merges the properties from the request body (req.body) onto the course object.
           //  Essentially, any properties sent in the PUT request body will overwrite the corresponding properties in the existing course data.
           res.json({message:"The course is updated successfully"})
        }else{
           res.status(404).json({message:"The course is not found"})
        }



  })



  // to show all the courses to the admin
  app.get('/admin/courses', adminAuthJWT, (req, res) => {
   res.json({ courses: COURSES });
 });



