const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: { type: String, required: [true, "Please add the username"] },
    email: {type: String, require: [true, "Please add the user email address"], unique:[true, "Eamil address already taken"]},
    password: { type: String, required: [true, "Please add the user password"] }
}, {
    timestamps: true //this will create createdAt and updatedAt fields automatically
});
module.exports = mongoose.model("User", userSchema);