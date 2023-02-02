const router = require("express").Router();
const Category = require("../models/Category");

//create a category
router.post("/",async(req,res)=>{
    const newCat = new Category(req.body);
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat)
    }catch(err){
        res.status(500).json(err);
        return;
    }
})

//get a category

router.get("/",async(req,res)=>{
    try{
        const categorydisplayed = await Category.find()
        res.status(200).json(categorydisplayed)
    }catch(err){
        res.status(500).json(err);
        return;
    }
})

module.exports = router