const User = require("../models/user.model.js");

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body   
        },{
             new: true,
        });
        if(!updatedUser){
            return res.status(404).json({
                message: "User not Found!",
            })
        }
        return res.status(200).json({
            message:" User updated sucessfully !",
            data: updatedUser,
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "User Update Failed!"
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "User has been deleted successfully."
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "User deletion failed."
        })
    }
}

const getAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);

        if(!admin) {
            return res.status(404).json({
                message: "User not found.",
        });
        }

        const {password, ...info} = admin._doc
        return res.status(200).json({
            message: "User found.",
            data: info
        
        })
        
    } catch(error){
        console.log(error)
        return res.status(500).json({
            message: " User query failed."
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const {password, ...info} = user._doc
        return res.status(200).json({
            message: "User found.",
            data: info
        
        })
        
    } catch(error){
        console.log(error)
        return res.status(500).json({
            message: " User query failed."
        })
    }
}

const getAllUsers = async (req, res) => {
    const query = req.query.latest;
    try {
        const users = query ? await User.find().limit(3) : await User.find();

        return res.status(200).json({
            message: "User found.",
            data: users
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            message: " User query failed."
        })
    }
}

const getUserStats = async (req, res) =>  {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear) - 1);

        const userStats = await User.aggregate([
            {
                $match: { createdAt: {$gte: lastYear} },
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json({
            message: "User Data Retrieved Successfully.",
            data: userStats,
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "User Statistics Acquisition Error.",
            error: error.message,
        })
    }
}

module.exports = {updateUser, deleteUser, getAdmin, getAllUsers, getUserStats, getUser};
