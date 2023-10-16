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
    res.json(users);
});


app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id); // same hota hai name
    const user = users.find(user => user.id === id);
    res.json(user);
});


//browser by default sends get request --> so we will use here POSTMAN
app.post('/api/users', (req, res) => { });
app.listen(PORT, () => { console.log(`server running on port ${PORT} `) });