const express = require('express')
const app = express()

const DBToDo = require("./db.js");

const port = 3005;

app.use(express.json());

app.get('/todo', (_, res) => {
    res.send(DBToDo.findAll());
})

app.get('/todo/:todoId', (req, res) => {
    const {todoId = ""} = req.params;

    if(!todoId) {
        return res.send({
            status: 500,
            message: "Param todoId not found"
        });
    }

    res.send(DBToDo.findById(todoId));
})

app.put('/todo/:todoId', (req, res) => {
    const {todoId = ""} = req.params;
    const {title = null, description = null} = req.body;

    if(!todoId) {
        return res.send({
            status: 500,
            message: "Param todoId not found"
        });
    }

    const finded = DBToDo.findById(todoId);

    if(!finded.length) {
        return res.send({
            status: 404,
            message: `ToDo not found to id ${todoId}`
        });
    }

    const [ToDo = {}] = finded;

    if(title) ToDo.title = title;

    if(description) ToDo.description = description;

    res.send(DBToDo.update(ToDo));
})

app.delete('/todo/:todoId', (req, res) => {
    const {todoId = ""} = req.params;

    if(!todoId) {
        return res.send({
            status: 500,
            message: "Param todoId not found"
        });
    }

    res.send(DBToDo.delete(todoId));
})

app.post('/todo', (req, res) => {

    const {title = null, description = null} = req.body;
    
    if(!title || !description) {
        return res.send({
            status: 500,
            message: "Title or Description not found"
        });
    }

    const ToDoCreated = DBToDo.create({
        title,
        description
    });

    res.send({
        status: 200,
        ...ToDoCreated
    });
});

app.listen(port, () => {
    console.log(`Listening port: ${port}`);
});