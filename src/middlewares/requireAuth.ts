import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: "No authorization headers" });
    }

    const tokenBearer = req.headers.authorization.split(" ");

    if (tokenBearer.length !== 2) {
        return res.status(401).send({ message: "Malformed token" });
    }

    const token = tokenBearer[1];

    if (token === process.env.UDAGRAM_REST_TOKEN) {
        next();
    } else {
        return res.status(500).send({ message: 'Failed to authenticate' });
    }
}
