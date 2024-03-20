
//  HTTP server is a type of software that runs on a computer and is designed to handle incoming Hypertext Transfer Protocol (HTTP) requests from clients, such as web browsers or other applications.
// When a client sends an HTTP request to a server, the server processes the request and returns an appropriate response, typically in the form of HTML pages, images, documents, or other resources.

// HTTP servers interpret these requests, fetch the requested resources, and send them back to the client's browser for display.

// Popular HTTP server software includes Apache HTTP Server, Nginx, Microsoft Internet Information Services (IIS), and others.



const express = require("express")

const app = express()
 
const port = 3000

function start(){
    console.log(`Example app listening on port ${port}` );
}

// the .listen() method is used to start a server and make it listen for incoming connections on a specified network address (IP address) and port number.
// It tells the server to listen on a specified port for incoming HTTP requests.
// The first argument is the port number on which the server should listen
// and the second argument (start) is a callback function that will be executed once the server starts listening.
app.listen(port,start)