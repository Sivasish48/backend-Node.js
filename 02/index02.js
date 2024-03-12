const  express = require("express")

const app = express()

const port = 3000

function calSum(count){
    let sum = 0
    let i = 0
    while(i<count){
        sum += i
    }
    return sum
}

// now create a callback function with two arameters such as req,res

function handleRequest(req,res){
    let calculatedSum = calSum(100)
    console.log(calculatedSum);
    
    let ans = `the calculated sum is ${calculatedSum}`


    // res.send() is an Express method used to send a response back to the client who made the HTTP request. It takes one parameter, which is the data that will be sent as the response body.
    // here the body is "ans"
    res.send(ans)
}


//app.get() is an Express method used to define a route for handling HTTP GET requests. It takes two parameters:
// The first one is The route path: It specifies the URL path for which the middleware function (or request handler) will be invoked. In this case, the route path is '/sumHandled'.
// and the second one is The request handler function: This function is called when a GET request is made to the specified route path. It takes two parameters,
// They are req (the request object) and res (the response object), and contains the logic to handle the request and send back a response. In the provided code, the handleRequest function is the request handler function.

// So, app.get('/sumHandled', handleRequest) means that when a GET request is made to the '/sumHandled' route, the handleRequest function will be invoked to handle the request.


app.get('/sumHandled', handleRequest)

function start(){
    console.log(`Example app listening port  ${port}`);
}

app.listen(port,start)