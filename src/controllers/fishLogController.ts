import { Request, Response } from 'express';
import FishLog from '../models/fishLog';

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
}
