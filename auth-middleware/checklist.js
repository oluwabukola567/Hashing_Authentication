const jwt = require("jsonwebtoken");
const { userSchema } = require("../models/user")
function check(req, res, next){

    // console.log(req.headers)
    //     return;
     if(req.headers.authorization){
        if(req.headers.authorization.split(" ")[0] == "Bearer"){
            const token = req.headers.authorization.split(" ")[1]; 
            jwt.verify(token, process.env.jwtkey, function(err, payload){
                if(err)console.log(err);
                    userSchema.findOne({ username: payload.username}, 'username', function(err, user){
                        if(err) console.log(err);
                       // console.log(user._id);
                       // req.decoded.id = user._id;
                        if(!user){
                            res.send("user does not exit");
                        }else{
                            req.decoded = user._id;
                            next();
                        }
                    })
             //   console.log(payload);
               
            });
        }
       // console.log();
    }else {
        res.send("you are not authorized")
    }


}


module.exports = {check};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJ1a29sYSIsImlhdCI6MTY1NDkxMTcyMX0.6cfdfO_aJfhPIGP_Fcn9jDMNHwsy0PItYtAg22h1xXQ
