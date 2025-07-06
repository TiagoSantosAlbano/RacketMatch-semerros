const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

console.log('Mongo URI:', process.env.MONGODB_URI || process.env.MONGO_URI);
console.log('Ambiente:', process.env.NODE_ENV);
console.log('Porta configurada:', process.env.PORT);

connectDB();

app.use(cors({
  origin: [
    'http://localhost:8081',
    'http://31.97.177.93:8081',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const adminRoutes = require('./routes/adminAuth');
const courtRoutes = require('./routes/courtRoutes');
const matchRoutes = require('./routes/matchRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const paypalRoutes = require('./routes/paypalRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/admin-auth', adminRoutes);
app.use('/api/admin/courts', courtRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/premium', premiumRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/chats', chatRoutes);

app.get('/pagamento/sucesso', (req, res) => {
  res.send('✅ Pagamento realizado com sucesso!');
});
app.get('/pagamento/cancelado', (req, res) => {
  res.send('❌ Pagamento cancelado.');
});
app.get('/paypal-cancel', (req, res) => {
  res.send('❌ Pagamento PayPal cancelado.');
});

// app.use((req, res) => {
//   res.status(404).json({ message: 'Rota não encontrada' });
// });

const PORT = process.env.PORT || 5000;
const PUBLIC_IP = process.env.PUBLIC_IP || 'localhost';

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend ativo em:`);
  console.log(`   • http://localhost:${PORT}`);
  console.log(`   • http://<teu-ip-local>:${PORT} 📱`);
  console.log(`   • http://${PUBLIC_IP}:${PORT} 🌍`);
});
