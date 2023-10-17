/* Task -> worked with mongoDB
*/


const express = require('express');
const app = express();
const PORT = 8000;
const fs = require('fs');
const mongoose = require('mongoose');

// connection
mongoose.connect('mongodb+srv://ashish_practice:qwer1234@mybackend.mhfbkfd.mongodb.net/?retryWrites=true&w=majority', { dbName: "PracticePiyush" })
    .then(() => console.log("connected successfully"))
    .catch(() => console.log("some error in connection of mongoDB"));
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    job_title: {
        type: String,
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema);

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


app.get('/users', async (req, res) => {
    const allDbusers = await User.find({});
    const html = `<ul>
    ${allDbusers.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul > `;
    res.send(html);
});

//REST API
app.get('/api/users', async (req, res) => {
    // console.log(req.headers);  -> set during sending
    res.setHeader("X-myName", "Ashish yadav"); // custom header hai yeah 
    /* Always add x to custom headers */

    const allDbusers = await User.find({});
    res.json(allDbusers);
});

//routing performed by express
app.route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 'Id not found' });
        }
        return res.json(user);
    })
    .patch(async (req, res) => {
        const body = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { first_name: body.first_name });
        if (!user) {
            return res.status(404).send({ status: 'Id not found' });
        }
        return res.json(user);
    })
    .delete(async (req, res) => {
        const body = req.body;
        const deletedid = req.body.id || req.params.id;
        const user = await User.findByIdAndDelete(deletedid);
        if (!user) {
            return res.status(404).send({ status: 'Id not found' });
        }
        return res.json(user);
    });



//browser by default sends get request --> so we will use here POSTMAN
app.post('/api/users', async (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body.first_name || !body.last_name || !body.email) {
        return res.status(401).json({ ERROR: " enter all the values" });
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });
    res.status(201).json({ msg: "success" });
});
app.listen(PORT, () => { console.log(`server running on port ${PORT} `) });