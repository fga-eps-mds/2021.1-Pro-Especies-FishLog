import { Request, Response, Router } from 'express';
import FishController from '../controllers/fishLogController';
import AuthService from '../middleware/auth';

const auth = new AuthService();

const fishLogRoutes = Router();

const fishLogController = new FishController();

fishLogRoutes.post('/', auth.authorize, (req: Request, res: Response) => {
  fishLogController.createFishLog(req, res);
});

fishLogRoutes.get('/', auth.authorize, (req: Request, res: Response) => {
  fishLogController.getAllFishLogs(req, res);
});

fishLogRoutes.get('/:id', auth.authorize, (req: Request, res: Response) => {
  fishLogController.getOneFishLog(req, res);
});

fishLogRoutes.patch('/:id', auth.authorize, (req: Request, res: Response) => {
  fishLogController.updateFishLog(req, res);
});

fishLogRoutes.delete('/:id', auth.authorize, (req: Request, res: Response) => {
  fishLogController.deleteFishLog(req, res);
});

fishLogRoutes.get(
  '/export/:id',
  auth.authorize,
  (req: Request, res: Response) => {
    fishLogController.generateCSV(req, res);
  }
);

export default fishLogRoutes;
