var express = require('express');
var router = express.Router();
const { register, login} = require("../controllers/auth");
const { check } = require("../auth-middleware/checklist");
const { postSchema } = require("../models/post");

/* GET home page. */
router.post('/', register);

router.post("/login", login);


router.get("/general", function(req, res){
    res.send("Anyone can have access to this route");
});

router.get("/restricted", check,  function(req, res){
    console.log(req.decoded);// = user._id;
    res.send("This route is restricted to only logged in users");
});

router.post("/makepost", check, function(req, res){
    const { post } = req.body; 
    const newPost = new postSchema({
        userId: req.decoded,
        post
    });
});


module.exports = router;
