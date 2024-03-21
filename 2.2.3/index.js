const express = require("express")

const app = express()
const port = 3003

const bodyParser = require("body-parser")

app.use(bodyParser.json())


// Status codes are numeric messages exchanged between a server and a client (like a web browser) when using a protocol like HTTP (Hypertext Transfer Protocol).
//  These codes indicate whether a request was successful, failed, or needs further action
// INFORMATIONAL: The request was received and the process is continuing. (e.g., 100 Continue) (100 – 199)

// SUCCESS:The request was successfully processed. (e.g., 200 OK) (200-299) // this is the by default satus code that we get if the server sends us some response



// REDIRECTION : Further action is needed to complete the request. The client should follow instructions from the server.  (300 - 399)


//CLIENT ERROR: The request itself is wrong or invalid and cannot be completed by the server. (e.g., 404 Not Found) (400 - 499)

//SERVER ERROR : The server encountered an error and couldn't complete the request. (e.g., 500 Internal Server Error) (500-599)

// we can implement this codes in the below call back fucntion


function calcSum(counter){
    let  sum = 0
 
     for(let i = 0;i< counter;i++){
         sum = sum +i
     }
     return sum
 }
 
function add(req,res){
    
      const counter = req.body.counter
      console.log(req.body);

      if (counter < 100000){
        
        let finalSum = calcSum(counter)
      console.log(finalSum);
  
      let answer = `The calculated sum is ${finalSum}` 
  
       res.send(answer)
      } else{
        res.status(411).send("Error:It is very big number")
        // res.status(411): This sets the status code of the HTTP response to 411. The status code 411 represents a "Length Required" error.
      }
      
  }
  
    app.get('/theadd',add)
  
  
  app.listen(port,()=>{
      console.log(`The port is listening at ${port}`);
  })

  