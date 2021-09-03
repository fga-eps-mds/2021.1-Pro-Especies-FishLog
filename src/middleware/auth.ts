import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default class AuthService {
  decodeToken = async (token: string) => {
    const data = await jwt.verify(
      token,
      process.env.AUTH_CONFIG_SECRET as string
    );
    return data;
  };

  authorize = (req: Request, res: Response, next: () => void) => {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({
        message: 'Acesso Restrito',
      });
    } else {
      jwt.verify(
        token,
        process.env.AUTH_CONFIG_SECRET as string,
        (error: any) => {
          if (error) {
            res.status(401).json({
              message: 'Token Inválido',
            });
          } else {
            next();
          }
        }
      );
    }
  };
}
