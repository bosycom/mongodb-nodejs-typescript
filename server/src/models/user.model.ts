import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  emailOffers: { type: Boolean, required: true },
  interfaceStyle: { type: String, required: true },
  subscriptionType: { type: String, required: true },
  notes: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);