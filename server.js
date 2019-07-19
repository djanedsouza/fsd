const http = require("http");

/*
http.createServer((request,response) => {
    response.write("Hello World");
    response.end();
}).listen(3000);
*/

//type localhost:3000 or 127.0.0.1:3000 in your browser


//imported file system module
const fs = require("fs");

//these are all built in modules
const path = require("path");

const filePath = path.join(__dirname, "sample.txt");

console.log(filePath);

//get the directory of the js file
console.log(__dirname);

//prints the current executed file
console.log(__filename);

//accessing file name from entire path
console.log(path.basename(filePath));

//
/*
http.createServer((req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        if(data){
            res.writeHead(300, {key: "value", key1: "value1"}); //write header
            res.write(data); //write to body
            res.end();
        }
    });

}).listen(3001);
*/


//its an asynchronous function
/*
fs.readFile(filePath, 'utf8', (err, data) => {
    if(err){
        console.log(err);
    }
    if(data){
        console.log(data);
    }
});
*/

//printing JSON content
/*
http.createServer((request,response) => {
    response.writeHead(300, {
        'Content-Type': 'application/json'
    });
    const data = {name: 'My name', age: 21, phone: 12345};
    //response should always be in string or buffer
    response.write(JSON.stringify(data));
    response.end();
}).listen(3002);
*/
