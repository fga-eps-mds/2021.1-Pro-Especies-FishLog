import { Request, Response } from 'express';
import FishLog from '../models/fishLog';
import AuthService from '../middleware/auth';

const auth = new AuthService();

export default class FishController {
  createFishLog = async (req: Request, res: Response) => {
    try {
      if (!(req.body.largeGroup || req.body.specie || req.body.photo)) {
        return res.status(400).json({
          message:
            'Registro não foi criado, é necessário o tipo, a espécie ou a foto para a criação de um registro.',
        });
      }
      const fish = await FishLog.create(req.body);

      return res.status(200).json({ fish });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha no sistema de criação de registro, tente novamente!',
      });
    }
  };

  getAllFishLogs = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const { status } = req.query;

      if (status === 'all') {
        if (data.admin) {
          const responseAdmin = await FishLog.find({});
          return res.status(200).json(responseAdmin);
        }
        const responseUser = await FishLog.find({ userId: data.id });
        return res.status(200).json(responseUser);
      }
      if (status === 'reviewed') {
        if (data.admin) {
          const responseAdmin = await FishLog.find({ reviewed: true });
          return res.status(200).json(responseAdmin);
        }
        const responseUser = await FishLog.find({
          userId: data.id,
          reviewed: true,
        });
        return res.status(200).json(responseUser);
      }
      if (status === 'toBeReviewed') {
        if (data.admin) {
          const responseAdmin = await FishLog.find({ reviewed: false });
          return res.status(200).json(responseAdmin);
        }
        const responseUser = await FishLog.find({
          userId: data.id,
          reviewed: false,
        });
        return res.status(200).json(responseUser);
      }
      return res
        .status(404)
        .json({ message: 'Parâmetro de busca não existente!' });

      // if (data.admin) {
      //   const responseAdmin = await FishLog.find({});
      //   if (status === 'all') {
      //     return res.status(200).json(responseAdmin);
      //   }
      //   if (status === 'reviewed') {
      //     const reviewedAdmin = [] as Object[];
      //     responseAdmin.forEach((element) => {
      //       if (element.reviewed === true) {
      //         reviewedAdmin.push(element);
      //       }
      //     });
      //     return res.status(200).json(reviewedAdmin);
      //   }
      //   if (status === 'toBeReviewed') {
      //     const toBeReviewedAdmin = [] as Object[];
      //     responseAdmin.forEach((element) => {
      //       if (element.reviewed === false) {
      //         toBeReviewedAdmin.push(element);
      //       }
      //     });
      //     return res.status(200).json(toBeReviewedAdmin);
      //   }
      //   if (!status) {
      //     return res
      //       .status(404)
      //       .json({ message: 'Parâmetro de de status não especificado!' });
      //   }
      //   return res
      //     .status(404)
      //     .json({ message: 'Parâmetro de status não existente' });
      // }
      // const responseUser = await FishLog.find({ userId: data.id });
      // return res.status(200).json(responseUser);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  getOneFishLog = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const logId = req.params.id;
      const fishLog = await FishLog.findById(logId);

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }
      if (data.admin || String(fishLog?.userId) === data.id) {
        return res.status(200).json(fishLog);
      }
      return res.status(401).json({
        message: 'Você não tem permissão para ver esse registro',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  updateFishLog = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const logId = req.params.id;
      const fishLog = await FishLog.findById(logId);

      const newFishLog = req.body;

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      if (
        data.admin ||
        (!fishLog.reviewed && String(fishLog?.userId) === data.id)
      ) {
        try {
          await fishLog.updateOne(newFishLog);

          await fishLog.updateOne({ $push: { updatedBy: data.id } });

          return res.status(200).json({
            message: 'Registo atualizado com sucesso!',
          });
        } catch (error) {
          return res.status(500).json({
            message: 'Falha ao atualizar o registro. Tente novamente',
          });
        }
      } else {
        return res.status(401).json({
          message: 'Você não tem permissão para ver esse registro',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  deleteFishLog = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const logId = req.params.id;
      const fishLog = await FishLog.findById(logId);

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      if (
        data.admin ||
        (!fishLog.reviewed && String(fishLog?.userId) === data.id)
      ) {
        try {
          await FishLog.findByIdAndDelete(logId);
          return res.status(200).json({
            message: 'Registo deletado com sucesso!',
          });
        } catch (error) {
          return res.status(500).json({
            message: 'Falha ao deletar o registro. Tente novamente',
          });
        }
      } else {
        return res.status(401).json({
          message: 'Você não tem permissão para deletar esse registro',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
