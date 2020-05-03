import User from '../models/user.model';
import { IUser } from '../interfaces/IUser';

interface ICreateUserInput {
  name: IUser['name'];
  emailOffers: IUser['emailOffers'],
  interfaceStyle: IUser['interfaceStyle'],
  subscriptionType: IUser['subscriptionType'],
  notes: IUser['notes'],
}

async function CreateUser({
  name,
  emailOffers,
  interfaceStyle,
  subscriptionType,
  notes
}: ICreateUserInput): Promise<IUser> {
  try {
    const data = await User.create({
      name,
      emailOffers,
      interfaceStyle,
      subscriptionType,
      notes
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export default {
  CreateUser
};