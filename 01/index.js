 
 // The fs module in Node.js stands for "File System" and provides functions for interacting with the file system on your computer.
 // . It allows you to perform various operations such as reading from files, writing to files, manipulating directories, and more. 

 //  Node.js, require() is a built-in function used to load modules (files containing JavaScript code) into your application.
 //  When you call require() and pass a module name or path as an argument, Node.js searches for the specified module in the following locations:
const fs = require("fs")


// "theCallbk" is a javaScript function , this function will be called if an error occurs or if a data gets retrieved.
// It has two parameter "err" which stands for error and another one is data
// If there is an error "err" will contain information about it
// Or if everything goes smoothly,"data" will contain the result.
function theCallbk(err,data){
    console.log(data); // helooo
}

// here readFile() is a function in node.js to read the contents of a file(a.txt).
// The "utf-8" parameter specifies that the file should be read as text using UTF-8 encoding. 
//  The third parameter, theCallbk, is a callback function that will be called once the file is read.
// So, when the file reading operation is complete, the theCallbk function will be executed with any error information (if there's an error) in the err parameter and the contents of the file in the data parameter.

fs.readFile("a.txt","utf-8",theCallbk)

  