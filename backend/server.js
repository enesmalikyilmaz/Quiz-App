import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import resultRoutes from './routes/result.js';
import adminRoutes from './routes/admin.js';
import Result from './models/Result.js';




// .env dosyası0ndan MONGO_URI, PORT değerlerini alır 
dotenv.config();


// Express ile oluşturulan uygulamayı http sunucusuna bağlar. Bunu da server değişkeniyle socket.io'ya bağlar
const app = express();
const server = http.createServer(app);
const io = new Server (server, {
    cors: {
        origin: "*", // geliştirme aşamasında olduğundan * ile tüm istekleri kabul ediyor
        methods: ["GET", "POST"], // Bağlantı sırasında gerekli HTTP metodları
    }
})

// Middleware
app.use(cors()); // front back haberleşmesi için  cors aktif halde.
app.use(express.json());// req.body içindeki JSON veriyi tanır.
app.use('/api/auth', authRoutes); // Uygulamadaki tüm auth ile ilgili apileri merkezileştirir
app.use('/api/quiz', quizRoutes); // Uygulamadaki tüm quiz ile ilgili apileri merkezileştirir
app.use('/api/user', resultRoutes);
app.use('/api/admin', adminRoutes);



// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB bağlantısı başarılı'))
.catch(err => console.error(' MongoDB bağlantı hatası:', err));


const activeGames = new Map();  // map türünde aktif oyunların listesi 

io.on('connection', (socket) => {
  console.log(' Yeni kullanıcı bağlandı:', socket.id);

  socket.on('joinQuiz', ({ quizId, username, totalQuestions }) => {
    socket.join(quizId);
    console.log(`${username} quiz ${quizId} odasına katıldı.`);

    if (!activeGames.has(quizId)) {
      activeGames.set(quizId, {
        currentQuestion: 0,
        players: new Map(),
        scores: new Map(),
        quizEnded: false,
        totalQuestions: totalQuestions || 5
      });
    }

    activeGames.get(quizId).players.set(socket.id, username);
  });

  socket.on('startQuiz', ({ quizId }) => {
    const game = activeGames.get(quizId);
    if (!game) return;
    io.to(quizId).emit('newQuestion', { questionIndex: game.currentQuestion });
  });

  socket.on('nextQuestion', ({ quizId }) => {
    const game = activeGames.get(quizId);
    if (!game) return;

    game.currentQuestion++;
    io.to(quizId).emit('newQuestion', { questionIndex: game.currentQuestion });
  });

  socket.on('submitAnswer', async ({ quizId, isCorrect, userId }) => {
    const game = activeGames.get(quizId);
    if (!game || game.quizEnded) return;

    const currentScore = game.scores.get(socket.id) || 0;
    const updatedScore = isCorrect ? currentScore + 10 : currentScore;
    game.scores.set(socket.id, updatedScore);

    io.to(quizId).emit('scoreUpdate', {
      scores: Array.from(game.scores.entries()).map(([id, score]) => ({
        username: game.players.get(id),
        score
      }))
    });

    if (game.currentQuestion < game.totalQuestions - 1) {
      setTimeout(() => {
        game.currentQuestion++;
        io.to(quizId).emit('newQuestion', { questionIndex: game.currentQuestion });
      }, 2000);
    } else if (!game.quizEnded) {
      //  SON SORU — 2 saniye sonra quizEnded gönderilecek
      setTimeout(async () => {
        game.quizEnded = true;

        for (const [socketId, username] of game.players.entries()) {
          const score = game.scores.get(socketId) || 0;
          try {
            await Result.create({ user: userId, quiz: quizId, score });
          } catch (e) {
            console.error('Sonuç kaydedilemedi:', e.message);
          }
        }

        io.to(quizId).emit('quizEnded');
      }, 2000); // Son sorudan 2 saniye sonra yönlendirme yapılır
    }
  });

  socket.on('disconnect', () => {
    console.log(' Kullanıcı ayrıldı:', socket.id);
    for (const [quizId, game] of activeGames.entries()) {
      game.players.delete(socket.id);
      game.scores.delete(socket.id);
    }
  });
});

// Geliştirirken Test için. Ana ekran açıldığında görülmeli
app.get('/', (req, res) => {
  res.send('Quiz API çalışıyor!');
});

// Dinleme
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(` Sunucu ${PORT} portunda çalışıyor...`);
});