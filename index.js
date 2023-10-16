const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send("home page")
})
app.get('/about', (req, res) => { res.send(`about page ${req.query.name} `) });


app.listen(5000, () => { console.log("server created") })