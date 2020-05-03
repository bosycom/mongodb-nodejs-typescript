import { TRoutesInput } from '../types/routes';
import UserController from '../controllers/user.controller';
import UserModel from "../models/user.model";
// import PetController from '../controllers/pet.controller';

export default ({ app }: TRoutesInput) => {
  app.post('/api/user', async (req, res) => {
    const user = await UserController.CreateUser({
      name: req.body.name,
      emailOffers: req.body.emailOffers,
      interfaceStyle: req.body.interfaceStyle,
      subscriptionType: req.body.subscriptionType,
      notes: req.body.notes,
    });

    // const pet = await PetController.CreatePet({
    //   owner: user._id,
    //   name: req.body.petName
    // });

    return res.send({ user });
  });

  app.get('/api/user', async (req, res) =>{
    const users = await UserModel.find({});

    return res.send(users);
  });
};