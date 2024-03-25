const express =  require("express")
const app = express()
const bodyParser = require("body-parser")

const port = 3007

app.use(bodyParser.json())

function theSum(counter){
    let sum = 0
    for(let i = 0;i<counter;i++){
        sum = sum +i
    }
    return sum
}

function theMul(counter){
    let mul = 1
    for(let i = 1;i<counter;i++){
        mul = mul * i
    }
    return mul
}


function handleFReq(req,res){
    let counter = req.body.counter
    console.log(req.body);

    let Sum = theSum(counter)
    let Mul = theMul(counter)

    // now we will see how get the body in a json format

    let calObj= {
        "sum":Sum,
        "mul":Mul
    }
    res.status(200).send(calObj)

    // when this object is sent as a response using res.send(sumObj),
    // it will be sent back to the client in JSON format with the structure:
    // and this is the more structured way to return data

}

app.post("/thecal",handleFReq)

// now we can also render the response in the term of html formal as well
  // to do that snd the html code you want in the send() with the response object in the callback

  function htmlFun(req,res){
    res.send(`<h1>Hello world</h1>`)

  }
app.post('/thehtml',htmlFun)


app.listen(port,()=>{
    console.log(`The port is listening at ${port}`);
})

