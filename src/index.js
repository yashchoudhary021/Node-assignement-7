const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
let studentArray = require('./InitialData');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here


// 1. Get all data
app.get("/api/student", (req, res) => {
    res.send(studentArray)
})

//2. Get data by Id
app.get("/api/student/:id", (req, res) => {
    const ids = req.params.id;
    let flag = false;
    for (let i = 0; i < studentArray.length; i++) {
        if (studentArray[i].id == ids) {
            res.send(studentArray[i])
        }
        if (ids !== studentArray[i].id) {
            flag = true;
        }
    }
    if (flag == true) {
        res.status(404).send('404 page not found')
    }
})

// 3. Adding new data

app.post("/api/student/", (req, res) => {
    let count = studentArray.length;
    const { name, currentClass, division } = req.body;
    if (name === undefined || currentClass === undefined || division === undefined) {
        res.status(400).send("Given details are incomplete")
    }
    else {
        studentArray.push({ "id": count + 1, "name": name, "currentClass": currentClass, "division": division });
        res.send(`${count + 1}`)
    }
})
// 4. Updating existing data

app.put("/api/student/:id", (req, res) => {
    const id = req.params.id;
    const {name, currentClass, division} = req.body;
    if (name === undefined || currentClass === undefined || division === undefined) {
        res.status(400).send("Invalid details")
    }
    let flag = false;
    for(let i=0; i<studentArray.length; i++){
        if(id == studentArray[i].id){
            flag = true;
            studentArray[i].name = name;
            studentArray[i].currentClass = currentClass;
            studentArray[i].division = division;
        }
    }
    if(flag === false){
        res.status(400).send(`This id ${id} is not exist.`)
    }
    res.send(`New_name: ${name}`)
})

// 5. Deleting data

app.delete("/api/student/:id", (req, res) => {
    const id = req.params.id;
    let flag = false;
    for (let i = 0; i < studentArray.length; i++) {
        if (id == studentArray[i].id) {
            studentArray.splice(i, 1)
            flag = true;
            res.send(`${id} is removed`)
        }
    }
    if (flag == false) {
        res.status(404).send("Invaild id")
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;