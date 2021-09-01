import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export default class AuthService {

    decodeToken = async (token: string) => {
        var data = await jwt.verify(token, 'secret');
        return data;
    }

    authorize = (req: Request, res: Response, next: () => void) => {
        var token = req.body.token || req.query.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({
                message: 'Acesso Restrito'
            });
        } else {
            jwt.verify(token, 'secret', function (error: any, decoded: any) {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido'
                    });
                } else {
                    next();
                }
            });
        }
    }
}