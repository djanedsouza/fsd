const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const schema = mongoose.Schema;

mongoose.connect('mongodb+srv://jane:jane@cluster0-npsox.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}, (error) => console.log(error));

const Item = new schema({
    item: String
});

const itemModel = mongoose.model("TodoApp", Item);

const app = express();

app.use(bodyParser.json()); //passing json
app.use(bodyParser.urlencoded({ //passing url encoded form with simple objects
    extended: false
}));

const filePath = path.join(__dirname, "index.html");

//const todoItems = ["Homework", "Asignments", "Netflix"];
let todoList = ["Homework", "Asignments", "Netflix"];

app.get("/", (request, response) => {
    response.sendFile(filePath);
});

/*app.get('/get', (request, response) => {
    response.json({
        items: todoList
    });
});*/

app.get('/get', (request, response) => {
    itemModel.find({}, (err, res) => {
        if(err) {
            console.log(err);
        }
        if(res){
            console.log(res);
            response.json({
                items: res
            });
        }
    });
});

/*
app.post('/add', (request, response) => {
    if(request.body.item){
        const arrayy = request.body.item.split(",");
        //todoItems.push(request.body.item);
        //todoList = [...todoList, ...request.body.item];
        todoList = [...todoList, ...arrayy];
        response.sendStatus(200);
    }
    else{
            response.sendStatus(400);
        }
});
*/

app.post('/add', (request, response) => {
    if(request.body.item){
        const item = new itemModel({
            item: request.body.item
        });
        item.save();
        response.sendStatus(200);
    }
    else{
        response.sendStatus(400);
    }
});

/*
app.post('/delete', (request, response) => {
    
    /*
    if(request.body.item){
        const arrayy = request.body.item;
        //todoItems.push(request.body.item);
        //todoList = [...todoList, ...request.body.item];
        
        if(todoList.includes(arrayy))
        {
            const index = todoList.indexOf(arrayy);
            todoList.splice(index, 1);
            response.sendStatus(200);
        }
        */
/*
        if(request.body.item && todoList.includes(request.body.item))
        {
            todoList = todoList.filter((x) => x !== request.body.item);
            response.sendStatus(200);
        }
        else{
            response.sendStatus(400);
        }
        
});
*/

app.post('/delete', (request, response) => {
    if(request.body.item){
            itemModel.remove({
                item: request.body.item
            }, (err) => {
                console.log(err);
        })
        response.sendStatus(200);
        }
        else{
            response.sendStatus(400);
        }
})

app.post('/edit', (request, response) => {
    if(request.body.olditem && request.body.newitem && todoList.includes(request.body.olditem))
        {
            const {olditem, newitem} = request.body;
            const index = todoList.indexOf(olditem);
            todoList[index] = newitem;
            response.sendStatus(200);
        }
        else{
            response.sendStatus(400);
        }
        
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});