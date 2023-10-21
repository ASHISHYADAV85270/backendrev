import jwt from 'jsonwebtoken';
const secretKey = 'afgsdhgsfagsfdbgfasgfd';

//this function makes token for me
function setUser(user) {
    const payload = {
        ...user,
    };
    return jwt.sign(payload, secretKey);
}
function getUser(token) {
    if (!token) {
        return null;
    }
    return jwt.verify(token, secretKey);
}

export { setUser, getUser };