let num =[4,5,6,7,2,1]

function ts(target){
 let sum = 0 
    for(let i =0;i<num.length;i++){
        sum = sum+i
    }
    if(sum === target){
        console.log(`index of sum is [${i} , ${i-1}]`);
    }
}

ts(9)