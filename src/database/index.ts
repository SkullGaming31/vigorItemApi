import mongoose, { ConnectOptions, MongooseError } from 'mongoose';

export async function initializeDatabase() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.MONGO_USER as string,
      pass: process.env.MONGO_PASS as string,
      dbName: process.env.MONGO_DB as string,
    } as ConnectOptions);
    console.log('Twitch Database Connected');

    mongoose.connection.on('disconnected', () => {
      console.log('Twitch Database Disconnected');
      mongoose.connection.removeAllListeners();
      mongoose.disconnect();
    });

    mongoose.connection.on('connected', () => {
      console.log('Twitch Database Connected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('Twitch Database re-Connected');
    });

    mongoose.connection.on('error', (err: MongooseError) => {
      console.error('Twitch Database Error:', err);
      mongoose.connection.removeAllListeners();
      mongoose.disconnect();
    });

  } catch (error: any) {
    console.error('Twitch Database Error:', error);
    mongoose.disconnect();
  }
}