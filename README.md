# Quiz-App

# 🧠 Interaktif Quiz Platformu (Node.js + React)

Bu proje, öğretmenlerin quiz oluşturabildiği, öğrencilerin gerçek zamanlı olarak katılabildiği ve canlı skor takibinin yapılabildiği modern bir web tabanlı quiz platformudur. Uygulama, **Node.js**, **React**, **Socket.io** ve **MongoDB** kullanılarak geliştirilmiştir.

---

## 🚀 Özellikler

- 👤 JWT tabanlı kullanıcı kayıt & giriş sistemi
- 🎓 Öğretmenler için quiz oluşturma arayüzü
- 🧑‍🎓 Öğrenciler için listeden quiz'e katılma (kod gerekmez)
- ⏱️ Gerçek zamanlı soru yayınlama & cevap alma (Socket.io)
- 📊 Canlı skor tablosu
- 📁 Quiz geçmişi görüntüleme
- 🛠️ Admin paneli: kullanıcı & quiz istatistikleri

---

## 🧱 Kullanılan Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React, Tailwind CSS, Axios, React Router |
| Backend  | Node.js, Express.js, Socket.io, JWT, bcrypt |
| Veritabanı | MongoDB + Mongoose |
| Diğer | dotenv, Postman, VS Code |

---

## 📁 Proje Yapısı

```
quiz-app/
├── backend/
│   ├── models/         # Mongoose modelleri
│   ├── routes/         # API rotaları
│   └── server.js       # Express + Socket.io sunucusu
├── frontend/
│   ├── src/
│   │   ├── pages/      # Sayfa bileşenleri (Login, Register, Dashboard, QuizPlay, vb.)
│   │   └── components/ # Navbar gibi ortak bileşenler
├── .gitignore
├── README.md
```

---

## 🔐 Kullanıcı Rollerine Göre Yetkiler

| Rol | Yetkiler |
|-----|----------|
| Öğretmen | Quiz oluşturabilir |
| Öğrenci | Quiz'e katılabilir |

---

## 🧪 Test Senaryosu

1. Öğretmen hesabıyla giriş yapılır, quiz oluşturulur.
2. Öğrenci hesabı oluşturulur, quiz listesinde görüntülenir.
3. Quiz'e katılınır, cevaplar gönderilir.
4. Skor tablosu gerçek zamanlı güncellenir.
5. Quiz geçmişi ekranında skorlar görünür.

---

## 🛠️ Kurulum (Local)

### 1. Backend

```bash
cd backend
npm install
npm start
```

`.env` dosyası içeriği:
```
MONGO_URI=mongodb+srv://... (MongoDB bağlantı adresiniz)
JWT_SECRET=supersecret
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📌 Notlar

- Tailwind CSS ile modern görsel tasarım sağlanmıştır
- Quiz oluşturmak için öğretmen rolüyle giriş yapmalısınız
- Öğrenciler hiçbir kod girmeden quiz'e katılabilir
