const express = require('express')
const app = express()

const port = 3001


//Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
// The next middleware function is commonly denoted by a variable named next.
//Middleware functions can execute tasks , make changes to the req and res objects, can end the request-response cycle , can cal the next middleware function in the task

// If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.

function middleware1(req,res,next){
    console.log("From the inside middleware"+req.headers.counter);
    next()
}
app.use(middleware1)
// After the execution of the middleware function then it have the control over the callback theSum
function sendMsg(req,res){
    res.send("The msg is sent")
}

app.get('/',sendMsg)

function calcSum(counter){
   let  sum = 0

    for(let i = 0;i< counter;i++){
        sum = sum +i
    }
    return sum
}




function Sum(req,res){

  
  //let counter = req.query.counter

   // These are one of the ways to request methods
  //  headers are additional pieces of information sent along with an HTTP request or response
  //  This is a property of the request object (req) in Express.js, which provides access to the headers sent in the HTTP request.

  console.log(req.headers); // all the headers will be logged
  let counter =req.headers.counter
  
    let finalSum = calcSum(counter)
    console.log(finalSum);

    let answer = `The calculated sum is ${finalSum}` 

     res.send(answer)
}

  app.get('/thesum',Sum)


app.listen(port,()=>{
    console.log(`The port is listening at ${port}`);
})