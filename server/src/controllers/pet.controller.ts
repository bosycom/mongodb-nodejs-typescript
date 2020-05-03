import Pet from '../models/pet.model';
import { IUser } from '../interfaces/IUser';
import { IPet } from '../interfaces/IPet';

interface ICreatePetInput {
  owner: IUser['_id'];
  name: IPet['name'];
}

async function CreatePet({ owner, name }: ICreatePetInput): Promise<IPet> {
  return await Pet.create({
    owner,
    name
  })
    .then((data: IPet) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  CreatePet
};