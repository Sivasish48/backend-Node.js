// As per we know that http request can only be sent by the browser and postman
// But there is another way from where we can send http request to our bult in  http server
// And that is called as the Nodejs processess

// so let us create object which will contain our method

const methodObj = {
    method:"GET"
}


 function logData(jsonBody){
    console.log(jsonBody);
 }
// now define the clbck here

function theclbck(result){
    result.json().then(logData)
}
// now use another external library of node js called fetch and put the route methodObj and keep a callback in the promise for its functionality

fetch("http://localhost:3005/Sum?count=58667",methodObj).then(theclbck)