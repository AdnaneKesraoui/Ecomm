const Cart = require('../models/cart.model.js');

const createCart = async (req, res) => {
    try{    
        const newCart = new Cart(req.body);
        await newCart.save();
        res.status(200).json({
            message: "Cart is created.",
            newCart,
    })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "An Error Occured While creating the Cart.",
            error: error.message
    })
    
    }
    
}


const updateCart = async (req,res) =>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
        },
    {
        new: true,
    });
    res.status(200).json({
        message: "Cart Updated Successfully.",
        updatedCart,
    })

    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Cart Update Failed.",
            error: error.message,
        })
    }
}

const deleteCart = async (req,res) =>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({
        message: "Cart has been deleted Successfully.", 
    });
    } catch(error) {
        console.log("error");
        res.status(500).json({
            message: "An error occured while deleting Cart.",
            error: error.message,
        });
    }
}

const getCart = async (req, res) => {
    try{
        const cartItem = await Cart.findById(req.params.id);
        res.status(200).json({
            cartItem,
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "An Error Occured While getting the Cart.",
            error: error.message,
        })

    }
}

const getCarts = async (req, res) => {
    try{
        const cartItems = await Cart.find();
        res.status(200).json({
            cartItems,
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "An Error Occured While getting the Cart.",
            error: error.message,
        })

    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getCarts,
}