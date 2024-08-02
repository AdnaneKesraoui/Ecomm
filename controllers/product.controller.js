const Product = require('../models/product.model.js');

const createProduct = async (req, res) => {
    try{    
        const categories = req.body.categories ? req.body.categories.split(",") : [];
        const newProduct = new Product({
            ...req.body,
            categories: categories,
            image: req.file.path,
        });
        await newProduct.save();
        res.status(200).json({
            message: "Product is created.",
            newProduct,
    })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "An Error Occured While creating the Product.",
            error: error.message
    })
    
    }
    
}


const updateProduct = async (req,res) =>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
        },
    {
        new: true,
    });
    res.status(200).json({
        message: "Product Updated Successfully.",
        updatedProduct,
    })

    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Product Update Failed.",
            error: error.message,
        })
    }
}

const deleteProduct = async (req,res) =>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
        message: "Product has been deleted Successfully.", 
    });
    } catch(error) {
        console.log("error");
        res.status(500).json({
            message: "An error occured while deleting Product.",
            error: error.message,
        });
    }
}

const getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            product,
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "An Error Occured While getting the Product.",
            error: error.message,
        })

    }
}

const getProducts = async (req, res) => {
    try{
        const qLatest = req.query.latest;
        const qCategory = req.query.category;
        
        let product ;

        if (qLatest) {
            product = await Product.find().sort({createdAt: -1}).limit(10);
        } else if (qCategory) {
            product = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
        } else {
            product = await Product.find();
        }

        res.status(200).json({
            product,
        })
         

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "An Error Occured While getting the Product.",
            error: error.message,
        })

    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProducts,
}