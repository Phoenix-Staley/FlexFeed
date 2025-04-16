const express = require('express');
const router = express.Router();
const db = require('../../config/connection');
const { User } = require('../../models');

// SIGNUP
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.create({ fullName, email, password });

    req.session.user_id = user.id;
    req.session.logged_in = true;
    req.session.username = user.fullName;

    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({
      message: err.errors?.[0]?.message || 'Email already exists or invalid input',
    });
  }
});

//Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 💡 Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    // Validate user + password
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.user_id = user.id;
    req.session.logged_in = true;
    req.session.username = user.fullName;

    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Logout 
router.get('/session', (req, res) => {
  res.json({
    logged_in: req.session.logged_in || false,
    user_id: req.session.user_id || null,
    username: req.session.username || "",
  });
});
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end(); // No content
    });
  } else {
    res.status(404).end();
  }
});

// Export the router
module.exports = router;