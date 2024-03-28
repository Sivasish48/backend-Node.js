const express = require("express")

const app = express()

const port = 3005

function calcSum(count){
    sum = 0

    for(let i = 0;i< count;i++){
        sum = sum +i
    }
    return sum
}


function handSum(req,res){
    const count = req.query.count
    let finalSum = calcSum(count)
    //console.log(finalSum);
      
    let response ={
        sum
    } 

     res.send(response)
}


app.get('/Sum',handSum)

function start(){
    console.log(`Example app listening port  ${port}`);
}

app.listen(port,start) 

