import mongoose from 'mongoose';

const MONGO_URL = process.env.DB_URL || 'mongodb+srv://damolasorinolu:MihAY9X9U3zMiYIJ@dignifiedlabs.wbhkx33.mongodb.net';

interface MongooseGlobal extends NodeJS.Global {
    mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }
  
  declare const global: MongooseGlobal;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {}; // No need for useNewUrlParser and useUnifiedTopology

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
