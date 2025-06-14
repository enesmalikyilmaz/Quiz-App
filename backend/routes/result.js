import express from 'express';
import Result from '../models/Result.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

//  Kullanıcının geçmiş quiz sonuçlarını getir
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate('quiz', 'title')
      .sort({ date: -1 });

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ message: 'Sonuçlar alınamadı', error: err.message });
  }
});

export default router;
