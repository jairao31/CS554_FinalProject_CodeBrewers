var jwt = require("jsonwebtoken");
const {auth} = require("../config/authConfig");

const generateToken = user => {
    if(!user) return;
    const token = jwt.sign(user, auth.secret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
     });
     return token;
}

const verifyUser = token => {
    if(!token) throw "Must pass a token!";

    const user = jwt.verify(token, auth.secret, (err,user) => {
        if(err) throw err;
        return user;
    })

    return user;
}

module.exports = {
    generateToken,
    verifyUser
}