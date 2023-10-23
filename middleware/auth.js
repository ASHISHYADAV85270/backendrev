import { getUser } from "../utils/auth.js";
function checkforAuthentication(req, res, next) {
    console.log("i am checking for authentication");
    const tokenCookie = req?.cookies?.token;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }
    const user = getUser(tokenCookie);
    req.user = user;
    return next();
}

function restricTo(roles) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect('/login');
        }
        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");
        }
        return next();
    }
}

export { checkforAuthentication, restricTo };