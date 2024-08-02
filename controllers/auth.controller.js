const User = require('../models/user.model.js');
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");

const register = async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const {password, ...info} = user._doc;
        res.status(201).json(info);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

const login = async(req, res) => {

    try {
    const user = await User.findOne({email: req.body.email});
    const {password, ...info} = user._doc;


    if (!user) {
        return res.status(404).json({
            message: "Email does not exist."
        })
    }

    const comparedPassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparedPassword) {
        return res.status(404).json({
            message: "Email or Password is incorrect."
        })
    }

    const token = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
    }, process.env.JWT_KEY, 
    {expiresIn: "3d"}
);

    
    res.status(200).json({
        data: {...info, token},
        message: "Login successful."
    })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Login failed.",
            error: error,
        })
    }

} 

module.exports = { register, login };