import mongoose from "mongoose";

let isConnected = false; 

const connectDB = async () => {
  if(isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'photo-diary',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB connected');
  }catch (err) {
    console.error('MongoDB connection failed', err);
  }
};

export default connectDB;