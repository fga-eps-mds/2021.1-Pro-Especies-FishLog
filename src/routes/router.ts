import { Router } from 'express';
// Rotas
import fishLogRoutes from './fishLogRoutes';

const router = Router();

router.use('/fishLog', fishLogRoutes);

export default router;
