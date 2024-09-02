import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cronjob from 'node-cron'
import ping from 'node-cron'
import cors from 'cors';
import connectDb from './config/connect.js';
import userRoutes from './routes/userRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;
const DB_NAME = process.env.DB_NAME;
const DB_STRING = process.env.DB_STRING;
const BASE_URL = process.env.BASE_URL;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/vehicle", vehicleRoutes);

// MongoDB connection
await connectDb(DB_STRING, DB_NAME);
console.log(BASE_URL)

cronjob.schedule('* * * * * *',() => {
    ping.sys.probe(BASE_URL);
 });

app.listen(PORT, () => {
    console.log(`Server is live.`);
});
