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

    
 }
