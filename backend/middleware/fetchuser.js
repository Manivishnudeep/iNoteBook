const jwt = require('jsonwebtoken');
const jwt_secret = "asdasfsdfsddfsdf1231";

const fetchuser = (req, res,next) => {
    const token = req.header("authToken")
    if (!token) {
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, jwt_secret)
        req.user=data.user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" })

    }
}

module.exports = fetchuser