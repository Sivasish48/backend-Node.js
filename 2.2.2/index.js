const express = require("express")
const app = express()

const port = 3002


function calcSum(counter){
    let  sum = 0
 
     for(let i = 0;i< counter;i++){
         sum = sum +i
     }
     return sum
 }
 
function add(req,res){
     let counter = req.query.counter
      let finalSum = calcSum(counter)
      console.log(finalSum);
  
      let answer = `The calculated sum is ${finalSum}` 
  
       res.send(answer)
  }
  
    app.get('/theadd',add)
  
  
  app.listen(port,()=>{
      console.log(`The port is listening at ${port}`);
  })