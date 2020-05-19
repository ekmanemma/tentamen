mongoose = require('mongoose');

const isEmail = ((v) => {
  // email validation regexps will make your eyes bleed... find one on stackoverflow
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
});

const bookSchema = new mongoose.Schema({
  ISBN: Number,
  Title: String,
  Author: String,
  Price: Number,
  SellerEmail: {
    type: String,
    validate:
    {
      validator: isEmail //calls a function for validation
    } 
  },
  Used: Boolean,
  Location: {
    City: String,
    Street: String
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;