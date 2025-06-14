// Öğretmen tarafından oluşturulur ve kullanıcılara sunulan soruları tutaer
import mongoose from 'mongoose';


const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId, // User modelindeki id'sini tutar
    ref: 'User', // User modeline referans veriri
    required: true
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
