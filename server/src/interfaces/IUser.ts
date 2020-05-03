import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    emailOffers: boolean;
    interfaceStyle: string;
    subscriptionType: string;
    notes: string;
  }