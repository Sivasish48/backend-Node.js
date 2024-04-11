const express = require('express')

const app = express()

app.use(express.json())
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.



const port = 3000

// as we know we have have two pages minimun that is a page for user and a page for admin

// so let us make  some globar variable labled 

let ADMINS = []

let USERS = []

let COURSE = []

// so now let us make a middleware function for the admin authentication


// as we know a middleware function has 3 parameters one is req object then res and the last one is the next() which is a function which we can call where we can want to pass this middleware function

 function adminAuthentication (req,res,next){
    

    const { username, password } = req.body;
    // the above line is equal to write the below lines of code
  
    //  const username = req.headers.username
    //  const password = req.headers.password

    // these syntax stores the value of username and the password from the header of the admin 

    // let create a syntax where it  is responsible for verifying if a user attempting to access a resource has admin privileges

    const admin = ADMINS.find((a)=>(a.username===username && a.password===password))
    //  This part defines a callback function used for filtering the ADMINS array. It iterates through each admin object (a) and checks two conditions:

    if (admin){
        next()
    }else{
        res.status(403).json({message: "The admin aunthentication is failed "})
    }
 }

 // now let us create a middleware function for the user aunthentication
 // It kind of runs with the same logic but instead of Admin array we provide the USERS array here



 // next: This is a callback function that allows the middleware to pass control to the next middleware function in the chain or the actual route handler function.

   function userAunthentication (req,res,next){
    const { username, password } = req.headers;

    const user = USERS.find((u)=>(u.username===username && u.password===password))


    //req.user = user;: This line attaches the found user object to the req object under the property name user. This allows subsequent middleware functions or the actual route handler to access the authenticated user's information.

    if (user){
        req.user = user
        next()
    }else{
        res.status(403).json({message: "The user aunthentication is failed "})
    }
   }

   // now let us creat routes and implement logic for specific operations




   // The below syntax is for the admin when he first time registers him/herself  with the POST method

   app.post("/admin/signup", (req,res)=>{
    // let us build the logic here before that let us creat a variable which will check the admin already exists or not

    // retrieve the admin data from the header and store it in a variable

    const admin = req.body
    console.log(req.body);
    const existingAdmin = ADMINS.find((a)=>(a.username === admin.username))

    // now put on the conditional rendering here

    if(existingAdmin){
        res.status(403).json({message:"The admin already exists"})
    }else{
        ADMINS.push(admin)
        res.json({message:"The admin is successfully created"})
    }
   })


   // now let us define routes and its functionality for the logging in 
   app.post("/admin/login", adminAuthentication, (req,res)=>{
    //  adminAuthentication is likely responsible for checking if the user trying to login is authorized as an administrator.
    // It might involve verifying credentials or checking for a valid admin session. 

    // route handles POST requests (data sent from a form submission) to the /admin/login path.
        res.json({message:"Logged in successfully"})
   })





   
   //now let us create a route and required fuctional logic to create course by the admin by POST method

   app.post("/admin/courses", adminAuthentication , (req,res)=>{
     
    // before creating courses the admin should be aunthenticated, that is why the adminAunthentication middleware function is used

    // now get the course from the header and store it in a variable

    let course = req.body

    // and the identification of the course will be defined by an unique id
    
    course.id=Date.now()

    // now put the course variable into the global COURSE variable

    COURSE.push(course)
    res.json({ message:"The course is created successfully"})
   })






   // now let us add routes and its required functionality to edit a existing course by the admin

   app.put("/admin/courses/:courseId", adminAuthentication , (req,res)=>{

    // let us store the course Id from the querry params and convert it into a number (it might be a string)
       let courseId = parseInt(req.params.courseId)
       
       // now let us store the logic in a variable of whether the given course id exists or not
       let course = COURSE.find((c)=>( c.id === courseId ))

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




   // now let us make a route and functionality to display all the existing courses to the admin by a GET method

   app.get("/admin/courses",adminAuthentication,(req,res)=>{
    console.log(req.body.courseId);

    res.json({courses:COURSE})
   })




   // Now let us create routes for User

   // Create a sign up route and its function for a new user

   app.post("/user/signup",(req,res)=>{
    
    // let us create a user object to store its username,password and purchasedcourse sapce from the body
    
    let user = {
        username:req.body.username,
        password:req.body.password,
        purchasedCourse:[]
    }

    // now after creating the user , push it to the USER global variable
    USERS.push(user)
    res.json({message:"The user is created successfully"})

   })



   // now create the login route for the user with the middleware userAunthentication function

   app.post("/user/login", userAunthentication,(req,res)=>{
       res.json({message:"Logged in successfully"})
   })



   // now create route and its functionality to show the user all the published courses

   app.get("/user/courses", userAunthentication , (req,res)=>{
    // let store the filtered courses in an array
    let filteredCourses = []

    // now create a loop to filter the published courses
    for(let i =1;i<COURSE.length;i++){
        if(COURSE[i].published){
            filteredCourses.push(COURSE[i])
        }
    }
    res.json({course:filteredCourses})
   })




   // now let us create an api handler route for purchasing purpose

   app.post("/user/courses/:courseId", userAunthentication , (req,res)=>{
      let courseId = Number(req.params.courseId)

      // now build the logic that the selected courseId exists and published

      let course = COURSE.find((c)=>(c.id === courseId && c.published))

      if(course){
        req.body.user.purchasedCourse.push(courseId);
        res.join({message:"Course purchased successfully"})
      }else{
        res.status(404).json({message:"Course not found or not available"})
      }
   } )



   // now create a route to show the user his/her purchasedCourses


   app.get("/users/purchasedCourses", userAunthentication , (res,req)=>{

      // include all the courses that is purchased using filtering

      let purchasedCourse = COURSE.filter((c)=> req.user.purchasedCourse.include(c.id))

      // then display those 
      res.json({purchasedCourse})
   })


    
app.get("/admins",(req,res)=>{
    res.json({ADMINS})
})

   app.listen(port,()=>{
    console.log(`Server is listening at ${port}`);
   })




 
