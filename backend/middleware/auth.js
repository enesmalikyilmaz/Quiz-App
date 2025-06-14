import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// JWT tokeni doğrular ve sadece yetkili kullanıcıların korumalı rotalara erişmesini sağlar

const authMiddleware = (req, res, next) => { 
  const authHeader = req.headers.authorization; //yetkilendirmenin başını alıyoruz
 // authHeader = ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6..."] gibi olur

  if (!authHeader || !authHeader.startsWith('Bearer ')) { // yetkilendirme hiç yoksa veya var ama Bearer ile başlamıyorsa
    return res.status(401).json({ message: 'Yetkisiz erişim (token eksik)' }); // error dönülğr
  }

  const token = authHeader.split(' ')[1]; // yoksa , token'a 1. indesteki elemanı yani asıl tokenı atar

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // token'ı ve token oluşturulurkenki secret'ı verdik
    req.user = decoded; // token içindeki kullanıcı bilgilerini req.user içine aktarır
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Geçersiz veya süresi dolmuş token' });
  }
};

export default authMiddleware;
