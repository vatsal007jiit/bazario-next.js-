import mongoose from 'mongoose';

const MONGODB_URI = process.env.DB! ;

if (!MONGODB_URI) {
  throw new Error('Please define the DB environment variable inside .env');
}

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10, // Limit connection pool size
      serverSelectionTimeoutMS: 5000, // 5 second timeout for server selection
      socketTimeoutMS: 45000, // 45 second timeout for socket operations
      bufferCommands: false, // Disable mongoose buffering [By default, if you try to run queries before Mongoose has finished connecting to MongoDB, it will queue (buffer) those operations and run them once the connection is established.When bufferCommands: false is set, Mongoose will NOT queue the operations.If you run a query before the connection is ready, it will throw an error immediately instead of waiting.]
    });
    
    connection.isConnected = db.connections[0].readyState;
    
    // Monitor connection events
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      connection.isConnected = 0;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      connection.isConnected = 0;
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    connection.isConnected = 0;
    throw error;
  }
}

export default dbConnect;
