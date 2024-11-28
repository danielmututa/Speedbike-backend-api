// src/modules/registerModel.js
const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password; // Ensure confirmPassword matches password
      },
      message: 'Passwords do not match.',
    },
  },
});


// Pre-save hook to hash the password and remove confirmPassword
registerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);

    // Remove confirmPassword field before saving to the database
    this.confirmPassword = undefined;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Register', registerSchema);
