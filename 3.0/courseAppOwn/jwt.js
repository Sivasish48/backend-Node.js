// JWT
// called as "Json Web Tokens"

// JWT is commonly used for authentication and authorization in web applications because it's stateless, compact, and can be easily transmitted over HTTP headers.
//  it's like a digital passport that securely carries information about the user (claims) from one place to another.

// let us install jwt and store it in a variable

const jwt = require('jsonwebtoken')
// let us just console the value of jwt
console.log(jwt);
// we get an obj with some properties having functions as its value

/*
{
  decode: [Function (anonymous)],
  verify: [Function (anonymous)],
  sign: [Function (anonymous)],
  JsonWebTokenError: [Function: JsonWebTokenError],
  NotBeforeError: [Function: NotBeforeError],
  TokenExpiredError: [Function: TokenExpiredError]
}
*/

// the term "super secret" typically refers to a sensitive piece of information, such as an encryption key
//  that is crucial for the security and functionality of the application. It's called "super secret" because it should be kept confidential and should not be shared or exposed to unauthorized users or entities.

let secret = 'superse3reit33(1)'

let user = {
    username:"sivasish@gmail.com",
    password:"123siva456"
}

// let us use some of the jwt's property to get the token

let ans = jwt.sign(user,secret)
// now console the ans
console.log(ans);
// we got the token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpdmFzaXNoQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzc2l2YTQ1NiIsImlhdCI6MTcxMzEwMTU2M30.pKvDouimI1zsH78uvu8GuRcgVw4OUgk6d3IUXjKaUU0

// this will only be valid for 1 hr 
// now our user object is encrypted into a token
// so the server dont need to check up the username password to hit any routes except login and signup

// let us see how to decrypt the token the into the the real properties of user,(which is done by the server) by using the property called "verify" 

jwt.verify(ans, secret, (err, decoded) => {
    if (err) {
        console.error('Error verifying JWT:', err);
        // Handle the error here, such as sending an error response
    } else {
        console.log('Decoded JWT payload:', decoded);
        // Use the decoded payload as needed
    }
});

/* Decoded JWT payload: {
  username: 'sivasish@gmail.com',
  password: '123siva456',
  iat: 1713102616
}
*/
// The iat claim in a JWT stands for "issued at" and represents the timestamp (in seconds) indicating when the token was issued. It is one of the standard claims defined by the JWT specification.
// In the context of your JWT token, the value 1713102616 represents the Unix timestamp when the token was issued. Unix timestamps are a way to represent time as the number of seconds that have elapsed since January 1, 1970 (known as the Unix epoch).
