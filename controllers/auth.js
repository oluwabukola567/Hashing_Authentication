const { userSchema} = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");


function register(req, res){
    const { username, email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userSchema({
        username, email, password: hashedPassword, role: 'user'
    });

    newUser.save(function(err){
        if(err) console.log(err);
        res.send("User created successfully");
    });
}

async function login(req, res){
    const {username, password} = req.body;
    const user = await userSchema.findOne({username}, "username password");
    console.log(user);
    const passwordMatch = bcrypt.compareSync(password, user.password);
    console.log(passwordMatch);
    if(!passwordMatch){
        res.send("Username or Password is incorrect");
    }else{
        //console.log(process.env.jwtkey);
        //return 0;
        jwt.sign({username: user.username, role: user.role }, process.env.jwtkey, function(err, token){
            res.send(token);
        });
        
    }  
}



module.exports = { register, login};