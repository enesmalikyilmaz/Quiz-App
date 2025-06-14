import express from 'express';
import Quiz from '../models/Quiz.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Quiz oluştur 
router.post('/create', authMiddleware, async (req, res) => { // kullanıcı giriş yapmamış mı kontrolü yapar
  const { title, questions } = req.body; // gelen title ve questions'ı alır

  if (req.user.role !== 'teacher') { // Gelen kullanıcının rolünü kontrol eder
    return res.status(403).json({ message: 'Sadece öğretmenler quiz oluşturabilir.' });
  }

  try {
    const quiz = await Quiz.create({
      title,
      questions,
      creator: req.user.id,
    });

    //await newQuiz.save(); // Oluşturulan bu quiz'i kaydeder. await, bu işlem bitene kadar başka işleme geçme demek

    res.status(201).json({ message: 'Quiz oluşturuldu', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Quiz oluşturulurken hata oluştu', error: err.message });
  }
});

//  Tüm quizleri listele 
router.get('/list', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('creator', 'username'); // tüm quizleri alır ve kullanıcı adını getirir
    res.status(200).json({ quizzes });
  } catch (err) {
    res.status(500).json({ message: 'Quizler alınırken hata oluştu', error: err.message });
  }
});

//  Belirli quiz detayını getir
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('creator', 'username');// 
    if (!quiz) return res.status(404).json({ message: 'Quiz bulunamadı' });

    res.status(200).json({ quiz });
  } catch (err) {
    res.status(500).json({ message: 'Quiz detayları alınamadı', error: err.message });
  }
});

export default router;
