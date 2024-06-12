const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @desc Get all Contacts
// @route Get / api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create New Contacts
// @route Post / api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is : ", req.body);
  const { name, email, phone } = req.body;
  if ((!name || !email, !phone)) {
    res.status(400);
    throw new Error("all field are required");
  }
  const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
  res.status(201).json(contact);
});

// @desc Get Contact
// @route Get / api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc Update Contact
// @route Put / api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString()  !== req.user.id){
    res.status(403);
    throw new Error("User don't have Permission to update other contact")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc delete Contact
// @route delete / api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString()  !== req.user.id){
    res.status(403);
    throw new Error("User don't have Psermission to delete other contact")
  }
  await Contact.deleteOne({_id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
