import { Request, Response, Router } from 'express';
import FishController from '../controllers/fishLogController';
import AuthService from '../middleware/auth';

const auth = new AuthService();

const fishLogRoutes = Router();

const fishLogController = new FishController();

fishLogRoutes.post('/', auth.authorize, (req: Request, res: Response) => {
  fishLogController.createFishLog(req, res);
});

export default fishLogRoutes;
