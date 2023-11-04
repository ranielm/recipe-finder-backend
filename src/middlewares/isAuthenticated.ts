import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const secret = process.env.JWT_SECRET;

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }

  try {
    const payload = verify(token, secret);
    (req as any).user = payload;
    next();
  } catch (error) {
    console.error('🚀 ~ file: isAuthenticated.ts:27 ~ error:', error);
    return res.sendStatus(403);
  }
};
