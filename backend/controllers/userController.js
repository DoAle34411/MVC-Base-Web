const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Get user by cedula
const getUserByCedula = async (req, res) => {
    const { cedula } = req.params;
    try {
        const user = await User.findOne({ cedula });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { name, cedula, password, birthDate } = req.body;
    try {
        const newUser = new User({ name, cedula, password, birthDate });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { cedula } = req.params;
    const { name, password, birthDate } = req.body;
    try {
        const user = await User.findOne({ cedula });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the fields
        user.name = name || user.name;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        user.birthDate = birthDate || user.birthDate;

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log('Error updating user:', error); 
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { cedula } = req.params;
    try {
        const user = await User.findOneAndDelete({ cedula });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Authenticate user (login)
const loginUser = async (req, res) => {
    const { cedula, password } = req.body;
    try {
        const user = await User.findOne({ cedula });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
};

module.exports = { getUsers, getUserByCedula, createUser, updateUser, deleteUser, loginUser };