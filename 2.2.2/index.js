const express = require("express")
const app = express()

// The body is where the actual data you want to send or receive resides.
// It's not visible in the URL and is separate from the headers.

// Body-parser is a popular middleware for Express.js, a web framework for Node.js, that simplifies parsing incoming HTTP request bodies
const bodyParser = require('body-parser')

const port = 3002

// This is a middleware function specifically provided by the body-parser package, a popular third-party library for Express.
app.use(bodyParser.json())

function calcSum(counter){
    let  sum = 0
 
     for(let i = 0;i< counter;i++){
         sum = sum +i
     }
     return sum
 }
 
function add(req,res){
    // body: The body property of the request object holds the data sent in the request body. This data is typically sent using methods like POST or PUT in HTTP requests.
    const counter = req.body.counter
     console.log(req.body);
      let finalSum = calcSum(counter)
      console.log(finalSum);
  
      let answer = `The calculated sum is ${finalSum}` 
  
       res.send(answer)
  }
  
    app.post('/theadd',add)
  
  
  app.listen(port,()=>{
      console.log(`The port is listening at ${port}`);
  })