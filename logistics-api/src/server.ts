import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb+srv://damolasorinolu:MihAY9X9U3zMiYIJ@dignifiedlabs.wbhkx33.mongodb.net';

mongoose.connect(DB_URL, {
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection error:', err);
});
