/* Task 

//hybrid server
GET /users -HTML document Render 
GET/api/users- List all users JSON

**DYNAMIC PATH PARAMS
GET /users/:id -Get user by id


POST /users -Create new user
PATCH /users/:id -Update user by id 
DELETE /users/:id -Delete user by id

//free json mockaroo.com

*/


const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const { error } = require('console');

app.use(express.urlencoded({ urlencoded: false }));
app.use(express.json());

app.use((req, res, next) => {
    // console.log('Request URL:', req.originalUrl);

    fs.appendFile("log.text", `\n ${Date.now()}: ${req.method} :${req.path}`, (err, data) => {
        next();
    });
})
app.get('/', (req, res) => {
    res.send("Hello Ashish");
});


app.get('/users', (req, res) => {
    const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul > `;
    res.send(html);
});

//REST API
app.get('/api/users', (req, res) => {
    // console.log(req.headers);  -> set during sending
    res.setHeader("X-myName", "Ashish yadav"); // custom header hai yeah 
    /* Always add x to custom headers */
    res.json(users);
});


function updateUser(id, updatedUser) {

}
//routing performed by express
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id); // same hota hai name
        const user = users.find(user => user.id === id);
        if (!user) {
            return res.status(404).send({ status: 'Id not found' });
        }
        res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id); // same hota hai name
        const updateduser = req.body;
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updateduser };
        } else {
            return res.status(404).send({ status: 'Id not found' });
        }
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
            res.json({ status: 'Success', id: users.length + 1 });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id); // same hota hai name
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
        }
        else {
            return res.status(404).send({ status: 'Id not found' });
        }
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
            res.json({ status: 'Success Deleted' });
        });
    });



//browser by default sends get request --> so we will use here POSTMAN
app.post('/api/users', (req, res) => {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email) {
        return res.status(401).json({ ERROR: " enter all the values" });
    }
    // console.log(body);
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
        res.status(201).json({ status: 'Success', id: users.length + 1 });
    });
});
app.listen(PORT, () => { console.log(`server running on port ${PORT} `) });