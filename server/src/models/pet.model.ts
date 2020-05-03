import mongoose, { Schema } from 'mongoose';
import { IPet } from '../interfaces/IPet';

const PetSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IPet>('Pet', PetSchema);