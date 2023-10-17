const User = require('../models/user.js');
async function getAllusers(req, res) {
    // console.log(req.headers);  -> set during sending
    res.setHeader("X-myName", "Ashish yadav"); // custom header hai yeah 
    /* Always add x to custom headers */

    const allDbusers = await User.find({});
    return res.json(allDbusers);
}
async function insertAuser(req, res) {
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
    return res.status(201).json({ msg: "success" });
}


async function getUserbyID(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send({ status: 'Id not found' });
    }
    return res.json(user);
}

async function updateUserbyId(req, res) {
    const body = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { first_name: body.first_name });
    if (!user) {
        return res.status(404).send({ status: 'Id not found' });
    }
    return res.json(user);
}
async function deleteUserbyId(req, res) {
    const body = req.body;
    const deletedid = req.body.id || req.params.id;
    const user = await User.findByIdAndDelete(deletedid);
    if (!user) {
        return res.status(404).send({ status: 'Id not found' });
    }
    return res.json(user);
}



module.exports = {
    getAllusers, getUserbyID, updateUserbyId, deleteUserbyId, insertAuser
}