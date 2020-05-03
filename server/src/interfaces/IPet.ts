import { IUser } from "./IUser";
import { Document } from "mongoose";

export interface IPet extends Document {
    name: string;
    owner: IUser['_id'];
  }