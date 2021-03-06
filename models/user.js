const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: false,
  },
  snsId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
