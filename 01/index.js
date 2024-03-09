 
 // The fs module in Node.js stands for "File System" and provides functions for interacting with the file system on your computer.
 // . It allows you to perform various operations such as reading from files, writing to files, manipulating directories, and more. 

 //  Node.js, require() is a built-in function used to load modules (files containing JavaScript code) into your application.
 //  When you call require() and pass a module name or path as an argument, Node.js searches for the specified module in the following locations:
const fs = require("fs")

function theCallbk(err,data){
    console.log(data);
}

fs.readFile("a.txt","utf-8",theCallbk)

 // write a function

 function sum(num1,num2){
    return num1+num2
 }

 console.log(sum(45,87));// 132