const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

  // User registration
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstName, lastName, email, username, password: hashedPassword });
      await newUser.save();
      res.send({ message: 'User registered successfully' });
  });
  
  // User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

  module.exports = router;