import express from 'express';
import User from '../models/User.js';
import Quiz from '../models/Quiz.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

//  Admin panel istatistikleri
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Erişim reddedildi: Admin değil' });
    }

    const users = await User.countDocuments();
    const quizzes = await Quiz.countDocuments();

    res.json({ users, quizzes });
  } catch (err) {
    res.status(500).json({ message: 'İstatistik alınamadı', error: err.message });
  }
});

export default router;
