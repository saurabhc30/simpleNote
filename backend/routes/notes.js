const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authenticateUser = require('../middleware/auth');

// Create note
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, user: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error("Error in POST /api/notes:", error.message);
    res.status(500).json({ message: "Error creating note", error: error.message });
  }
});

// Get notes
router.get('/', authenticateUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update note
router.put('/:noteId', authenticateUser, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate({ _id: noteId, user: req.user.id }, { title, content }, { new: true });
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send({ message: 'Error updating note', error });
  }
});

// Delete note
router.delete('/:noteId', authenticateUser, async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findOneAndDelete({ _id: noteId, user: req.user.id });
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting note', error });
  }
});

module.exports = router;