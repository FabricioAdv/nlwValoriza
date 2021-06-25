import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface iPayload 
{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction)
{
    const authToken = request.headers.authorization;

    if (!authToken)
    {
        return response.status(401).end();
    }

    const [, token] = authToken.split(' ');

    try
    {
        const { sub } = verify(token, 'dabc5252413e70830a8844c7517e3559') as iPayload;
        
        request.user_id = sub;
    }
    catch (err)
    {
        return response.status(401).end();
    }

    return next();
}