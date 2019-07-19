const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const app = express();

app.set('view-engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json()); //passing json
app.use(bodyParser.urlencoded({ //passing url encoded form with simple objects
    extended: false
}));

const filePath = path.join(__dirname, "index.html");

app.get('/login', (request, response) => {
    const person = [{
       name: "Donita",
       phone: 12345,
       address: "Mangalore"
    },
    {
        name: "Jane",
        phone: 67890,
        address: "Bejai"
     },
     {
        name: "Theresa",
        phone: 81470,
        address: "Vamanjoor"
     }];
    response.render("login.ejs", {
        name: "Signup",
        data: person,
    });
});

app.get('/', (request, response) => {
    //response.json("Homepage");
    response.sendFile(filePath);
});

app.post('/submit', (request, response) => {
    //console.log(request);
    console.log(request.body);
    //response.json("Form submitted");
    const errors = [];

    //form validation
    if(!request.body){
        errors.push("Empty Body");
    }
    else{
        if(!request.body.txtName){
            errors.push("Missing Name");
        }
        if(!request.body.txtEmail){
            errors.push("Missing Email");
        }
        if(!request.body.txtPassword){
            errors.push("Missing Password");
        }
    }
    response.json({
        error: errors
    });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});