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
});

module.exports = mongoose.model('Register', registerSchema);



// Virtual field for confirmPassword (not persisted in the database)
registerSchema.virtual('confirmPassword')
  .set(function (value) {
    this._confirmPassword = value;
  })
  .get(function () {
    return this._confirmPassword;
  });

// // Custom validation for confirmPassword
// registerSchema.pre('validate', function (next) {
//   if (this._confirmPassword && this._confirmPassword !== this.password) {
//     this.invalidate('confirmPassword', 'Passwords do not match.');
//   }
//   next();
// });

// // Pre-save hook to hash the password
// registerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });
