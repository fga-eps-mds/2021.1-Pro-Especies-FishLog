import { Request, Response } from 'express';
import FishLog from '../models/fishLog';
import AuthService from '../middleware/auth';

const auth = new AuthService();

export default class FishController {
  createFishLog = async (req: Request, res: Response) => {
    try {
      if (!(req.body.fishType || req.body.specie || req.body.photo)) {
        return res.status(400).json({
          message:
            'Registro não foi criado, é necessário o tipo, a espécie ou a foto para a criação de um registro.',
        });
      }
      const fish = await FishLog.create(req.body);

      return res.status(200).json({ fish });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Falha no sistema de criação de registro, tente novamente!',
      });
    }
  };

  getAllFishLogs = async (req: Request, res: Response) => {
    try {
      // const token = req.headers.authorization?.split(' ')[1];
      // const data = await auth.decodeToken(token as string);
      const response = await FishLog.find({});
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
