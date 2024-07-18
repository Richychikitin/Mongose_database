const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    dni: {type: String, require: true, unique: true},
    names: { type: String, required: true },
    adress: { type: String, required: true },
    date: { type: Date, required: true },
    rol: {type: String, enum: ['Admin', 'Empleado', 'Cliente'], require: true},
    tel: {type: String, require: true},
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user: { type: String, required: true, unique: true }

});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

module.exports = mongoose.model('User', userSchema);