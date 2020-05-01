import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
  }