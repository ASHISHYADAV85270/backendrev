import { User } from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import { setUser } from '../utils/auth.js'
async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    if (name == "" || email == "" || password == "") {
        return res.render("signup.ejs", { error: "Fill All the enteries" });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.render("signup.ejs", { error: "Email already exists" });
    }
    await User.create({ name, email, password });
    return res.redirect('/');
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId);
        return res.redirect('/');
    }
    else {
        return res.render("login.ejs", { error: "Invalid Email or Password" });
    }
}
export { handleUserSignUp, handleUserLogin };