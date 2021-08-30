import { Request, Response, Router } from 'express';
import FishController from '../controllers/fishLogController';

const fishLogRoutes = Router();

const fishLogController = new FishController();

fishLogRoutes.post('/', (req: Request, res: Response) => {
  fishLogController.createFishLog(req, res);
});

export default fishLogRoutes;
