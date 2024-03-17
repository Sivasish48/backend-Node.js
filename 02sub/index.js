const express = require('express')
const app = express()
const port = 3000




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/name', (req, res) => {
    res.json('sivasishhhhhhhh')
  })

  
  function calcSum(counter){
    sum = 0

    for(let i = 0;i< counter;i++){
        sum = sum +i
    }
    return sum
}

// Query parameters are a way to pass data to a web server as part of an HTTP request. They are commonly used in URLs to specify parameters for a resource.
//  In a URL, query parameters are appended to the end of the URL after a question mark (?) and are separated by ampersands (&). 

// the way to do it is mention below callback function


function handSum(req,res){

  //  a Node.js application handling HTTP requests, req.query.counter is a way to access the value of a query parameter named "counter" from an incoming HTTP request.
  // req: This variable typically represents the request object in a Node.js web server application. It contains information about the incoming HTTP request, such as the URL, headers, and any data sent with the request.
  // .query: This is a property of the request object (req) provided by frameworks like Express.js, which is commonly used for building web applications in Node.js. It is used to access the query string parameters of the URL.
  let counter = req.query.counter
  
    let finalSum = calcSum(counter)
    console.log(finalSum);

    let answer = `The calculated sum is ${finalSum}` 

     res.send(answer)
}

  app.get('/summ',handSum)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})