const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "please add the contact name"],
  },
  email: {
    type: String,
    required: [true, "please add the contact email"],
  },
  phone: {
    type: String,
    required: [true, "please add the phone number"],
},
},
{
    timestamps: true, // It adds createdAt and updatedAt as dates (ISO 8601)
});
module.exports = mongoose.model("Contact", contactSchema);