import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/AuthRouter.js';
 import movieRoutes from './routes/MovieRouter.js';
  import adminRoutes from './routes/AdminRouter.js';
dotenv.config();
connectDB();

const limiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
   message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes."
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false
});


const Port = process.env.Port || 5000;
const app = express();


app.use(cors(["http://localhost:8080/"]));
app.use(express.json());
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});
app.get('/',(req,res)=>{
    res.send("Welcome!");
})

// const server = app.listen(Port,()=>console.log(`server is listenning on port ${Port}`));
// server.timeout = 30000;