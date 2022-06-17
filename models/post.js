const mongoose = require("mongoose");
const { Schema } = mongoose;
const post = new Schema({
    userId: Schema.Types.ObjectId,
    post: String
})






const postSchema = mongoose.model("posts", post);
module.exports = { postSchema }