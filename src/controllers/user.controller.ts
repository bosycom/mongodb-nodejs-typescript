import User from '../models/user.model';
import { IUser } from '../interfaces/IUser';

interface ICreateUserInput {
  email: IUser['email'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
}

async function CreateUser({
  email,
  firstName,
  lastName
}: ICreateUserInput): Promise<IUser> {
  try {
    const data = await User.create({
      email,
      firstName,
      lastName
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export default {
  CreateUser
};