import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';
import { key } from './keys';
import { UserType } from './userType';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): any {
    const autoken = req.headers.authorization;
    const token = autoken && autoken.split(' ')[1];
    const pem = jwkToPem(key);
    jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] }, function(
      err,
      decodedToken,
    ) {
      const userType = res.locals.userType;
      if (userType == UserType.Editor) {
        next();
      } else {
        res.status(401).json({
          error: new Error('Invalid request!'),
        });
      }
    });
  }
}
