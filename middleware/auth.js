// import { getUser } from "../utils/auth.js";
// async function restrictToLoggedInUserOnly(req, res, next) {
//     const token = req.cookies?.token;
//     if (!token) {
//         return res.redirect("/login");
//     }
//     const user = getUser(token);
//     if (!user) {
//         return res.redirect("/login");
//     }
//     req.user = user;
//     next();
// }

// //just checking user is authenticated or not
// async function checkAuth(req, res, next) {
//     const token = req.cookies?.token;
//     const user = getUser(token);
//     req.user = user;
//     next();
// }
// export { restrictToLoggedInUserOnly, checkAuth };



import { getUser } from "../utils/auth.js";
async function restrictToLoggedInUserOnly(req, res, next) {
    const userId = req.headers['authorization'];
    if (!userId) {
        return res.redirect("/login");
    }
    const token = userId.split('Bearer ')[1]; // Bearer tokenValue
    const user = getUser(token);
    if (!user) {
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

//just checking user is authenticated or not
async function checkAuth(req, res, next) {
    const userId = req.headers['authorization'];
    const token = userId?.split('Bearer ')[1]; // Bearer tokenValue

    const user = getUser(token);
    req.user = user;
    next();
}
export { restrictToLoggedInUserOnly, checkAuth };