import mongoose from 'mongoose';

type TInput = {
  db: string;
}

export default ({ db }: TInput) => {
  const connect = async () => {
    try {
      await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
      return console.info(`Successfully connected to MongoDB on ${db}`);
    } catch (err) {
      console.error('Error connecting to MongoDB: ', err);
      return process.exit(1);
    }
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};