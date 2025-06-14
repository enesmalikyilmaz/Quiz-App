import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true, // e mail gönderilemezse hata gelir
    unique: true, // aynı e mail ile 2 kişi kayıt olamasın diye
  },
  password: {
    type: String,
    required: true,
    unique: true, // hatalı olabilir
  },
  role: {
    type: String,
    enum: ['teacher', 'student'],
    default: 'student', // öğrenci için ayrı bir gönderime gerek bırakmaz.
  },
  createdAt: {
    type: Date,
    default: Date.now, // Şimdiki tarihi verir
  }
});

// Şifreyi kaydetmeden önce hash'le
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Şifreyi değişmemişse işleme gerek yok

  try {
    const salt = await bcrypt.genSalt(10); // rastgele salt verisi oluşturulur 10 zorluğunda
    this.password = await bcrypt.hash(this.password, salt); // Şifreyi salt ile hash'ler
    next();
  } catch (err) {
    return next(err);  // error varsa hata mesajı gönderir
  }
});

// Şifre karşılaştırma fonksiyonu
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema); // Yukarıda oluşturduğumuz userSchema'yı User'e attık
export default User; // User'ı her yerden erişilebilir kıldık
