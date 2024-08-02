const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => { 
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Access denied."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).json({message: "Invalid token."});
    }
}


const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }
        else {
            return res.status(500).send("User is not an admin, can not delete item.")
        }
    })
}


module.exports = {verifyToken, verifyAdmin};