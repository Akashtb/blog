const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");


//CREATE Post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//update post

router.put("/:id", async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body
                    },
                    { new: true }

                );
                res.status(200).json(updatedPost)
            }catch(err){
                res.status(500).json(err);
                
            }
        } else {
            res.status(401).json("you can updated your own post")
        }


    }catch(err){
        res.status(500).json(err);
    }

});
//delete post

router.delete("/:id", async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
               await post .delete();
                res.status(200).json("your post has been deleted")
            }catch(err){
                res.status(500).json(err);
                
            }
        } else {
            res.status(401).json("you can delete your own post")
        }


    }catch(err){
        res.status(500).json(err);
    }

});

//GET post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
        return;
    }
});

//GET ALL DATA

router.get("/", async(req,res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({category:{
                $in:[catName],
            },})
        }else{
            posts =await Post.find();
        }
        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json(err);
        return;
    }
});




module.exports = router