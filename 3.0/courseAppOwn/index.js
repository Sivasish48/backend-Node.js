const express = require('express')

const app = express()

app.use(express.json())
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.



const port = 3001

// as we know we have have two pages minimun that is a page for user and a page for admin

// so let us make  some globar variable labled 

let ADMINS = []

let USERS = []

let COURSE = []

// so now let us make a middleware function for the admin authentication


// as we know a middleware function has 3 parameters one is req object then res and the last one is the next() which is a function which we can call where we can want to pass this middleware function

 function adminAuthentication (req,res,next){
    

    const { username, password } = req.headers;
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
 
 
