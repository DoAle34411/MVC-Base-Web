const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true }
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Hash the password
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare provided password with stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;

