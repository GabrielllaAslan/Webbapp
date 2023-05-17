const express = require("express");
const mysql = require('mysql');

const app = express();

// Use public folder
app.use(express.static("public"));

// Use json middleware
app.use(express.json());

// http://localhost:4000/
const PORT = 4000;

app.listen(PORT, () => {
    console.log("Express server is running at port no:" + PORT);
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
})

// Connect with database
connection.connect((err) => {
    if (!err)
        console.log("Db connection succeded");
    else
        console.log("DB connection failed \n Error: " + JSON.stringify(err, undefined, 2))
})

// Fetch all users
app.get("/fetch-all-users", (req, res) => {
    connection.query('SELECT * FROM user', (err, rows, fields) => {
        res.json(rows);
    })
});

// Create user
app.post("/create", (req, res) => {
    const body = req.body;
    if (!body) {
        return res.sendStatus(400);
    }
    connection.query('INSERT INTO user SET ?', { name: body.name, email: body.email }, function (error, results, fields) {
        if (error) throw error;
        res.sendStatus(200);
    });
});

// Delete user
app.delete("/delete", (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.sendStatus(400);
    }
 
    connection.query('DELETE FROM user WHERE id =' + id, function (error, results, fields) {
        if (error) throw error;
        res.sendStatus(200);
    });
});

// Fetch one user
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.sendStatus(400);
    }
 
    connection.query('SELECT * FROM user WHERE id =' + id, function (err, rows, fields) {
        res.json(rows);
    });
});

// Update the user
app.post("/update", (req, res) => {
    const body = req.body;
    if (!body) {
        return res.sendStatus(400);
    }

    connection.query('UPDATE user SET ? WHERE id = ' + body.id, { name: body.name, email: body.email }, (err, rows, fields) => {
        res.json(rows);
    })
});

app.get("/contact", (req, res) => {
    res.send("<h1>Kontakta oss</h1><a href='/'>Go tillbaka</a>")
});

app.get("/about", (req, res) => {
    res.send("<h1>Om oss</h1><a href='/'>Go tillbaka</a>")
});