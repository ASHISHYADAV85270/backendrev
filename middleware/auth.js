import { getUser } from "../utils/auth.js";
async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.redirect("/login");
    }
    const user = getUser(userUid);
    if (!user) {
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

//just checking user is authenticated or not
async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}
export { restrictToLoggedInUserOnly, checkAuth };