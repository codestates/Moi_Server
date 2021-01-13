const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  snsId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  resumeId: [{ type: mongoose.Types.ObjectId, ref: 'Resume' }],
});

module.exports = mongoose.model('User', userSchema);
