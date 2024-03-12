const express = require("express")

const app = express()

const port = 3002

function calcSum(count){
    sum = 0

    for(let i = 0;i< count;i++){
        sum = sum +i
    }
    return sum
}


function handSum(req,res){
    let finalSum = calcSum(100)
    console.log(finalSum);

    let answer = `The calculated sum is ${finalSum}`

     res.send(answer)
}

app.get('/handleSum',handSum)

function start(){
    console.log(`Example app listening port  ${port}`);
}

app.listen(port,start) 