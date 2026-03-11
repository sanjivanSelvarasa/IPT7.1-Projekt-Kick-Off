const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const db = require('../database/db');

const router = express.Router();

// Get current user (from token) - MUST come before /:id
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = db.get(
      db.state.userDb,
      'SELECT id, email, username, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = db.get(
      db.state.userDataDb,
      'SELECT bio, avatar_url, twitter, linkedin, github, instagram FROM user_profiles WHERE user_id = ?',
      [req.user.id]
    );

    res.json({
      user: {
        ...user,
        profile: profile || {}
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get user profile
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Get user info
    const user = db.get(
      db.state.userDb,
      'SELECT id, email, username, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user profile info
    const profile = db.get(
      db.state.userDataDb,
      'SELECT bio, avatar_url, twitter, linkedin, github, instagram FROM user_profiles WHERE user_id = ?',
      [userId]
    );

    res.json({
      user: {
        ...user,
        profile: profile || {}
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, bio, avatar_url, twitter, linkedin, github, instagram } = req.body;

    // Check if user exists and is authorized
    const user = db.get(db.state.userDb, 'SELECT id FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user username if provided
    if (username) {
      db.run(
        db.state.userDb,
        'UPDATE users SET username = ? WHERE id = ?',
        [username, userId]
      );
    }

    // Update user profile
    db.run(
      db.state.userDataDb,
      `UPDATE user_profiles 
       SET bio = ?, avatar_url = ?, twitter = ?, linkedin = ?, github = ?, instagram = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`,
      [bio || null, avatar_url || null, twitter || null, linkedin || null, github || null, instagram || null, userId]
    );

    // Return updated user
    const updatedUser = db.get(
      db.state.userDb,
      'SELECT id, email, username, created_at FROM users WHERE id = ?',
      [userId]
    );

    const updatedProfile = db.get(
      db.state.userDataDb,
      'SELECT bio, avatar_url, twitter, linkedin, github, instagram FROM user_profiles WHERE user_id = ?',
      [userId]
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        ...updatedUser,
        profile: updatedProfile
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
