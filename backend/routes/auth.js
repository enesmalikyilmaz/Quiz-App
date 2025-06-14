import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); //.env  dosyası oluşturur

const router = express.Router(); // modüler rota tanımı için router nesnesi oluşturur

// JWT oluşturma fonksiyonu
const generateToken = (user) => {
  return jwt.sign(  // token içine gömülecek veri, secret ve diğer parametreleri alan bir fonksiyon
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' } // 2 saat geçerliliği var
  );
};

//  Kullanıcı Kayıt
router.post('/register', async (req, res) => {  // Gelen POST isteğini yakalar
  const { username, email, password, role } = req.body; // Front'dan gelen verinin ilgili alanlarını alır

  try {
    const userExists = await User.findOne({ email }); // Veritabanında gelen emailde bir kullanıcı var mı bakar
    if (userExists) {
      return res.status(400).json({ message: 'Bu email zaten kayıtlı.' });
    }

    const newUser = new User({ username, email, password, role }); // yeni kullanıcı oluşturulur
    await newUser.save();

    const token = generateToken(newUser); // Token üretilir
    res.status(201).json({ // token JSON olarak başarılı olduğunu döner
      message: 'Kayıt başarılı',
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

//  Kullanıcı Giriş
router.post('/login', async (req, res) => { // gelen isteği karşılar
  const { email, password } = req.body; // ilgili alanlar alınır

  try {
    const user = await User.findOne({ email }); // e mail aynı olan var mı sorgusu
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    const isMatch = await user.comparePassword(password); // e mail başarılıysa şifresi aynı mı sorgusu
    if (!isMatch) return res.status(401).json({ message: 'Hatalı şifre.' });

    const token = generateToken(user); // kullanıcıya özel bir token
    res.status(200).json({ // Başarılıysa bilgiler döner
      message: 'Giriş başarılı',
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

export default router;
