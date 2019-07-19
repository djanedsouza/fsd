const express = require(‘express’);
const path = require(‘path’);
const app = express();

//basic path
app.get(‘/’, (request, response) => {
	response.json({message: “hello”})

//users path
app.get(‘/users’, (request, response) => {
	response.json({message: “hello”})

//admin path
app.get(‘/admin’, (request, response) => {
	const pathname = path.join(__dirname, ‘index.jpg’);
	response.jsendFile(pathname)

app.listen(3000, () => {
	console.log(“Server started”);
});
