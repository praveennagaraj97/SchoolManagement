import { config } from 'dotenv';
import express from 'express';
import multer from 'multer';
import mongoDB from './db';
import { cors } from './middleware/cors';
import { reqLogs } from './middleware/logs';
import classRouter from './routes/classRoutes';
import studentRouter from './routes/studentRoutes';
import teacherRouter from './routes/teacherRoutes';
import userRouter from './routes/userRoutes';

const forms = multer();

config();

mongoDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(forms.any());
app.use(express.json());

// CORS
app.use(cors);

// Global req middleware
app.use(reqLogs);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/class', classRouter);
app.use('/api/v1/teacher', teacherRouter);
app.use('/api/v1/student', studentRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is up`);
});
