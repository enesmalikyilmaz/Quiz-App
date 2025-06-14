import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Veritabanı bağlantısı başarılı');
  } catch (err) {
    console.error('Veritabanı bağlantı hatası:', err.message);
    process.exit(1);
  }
};