import { Router, Request, Response } from 'express';

const router = Router();

router.get("/logout", (req: Request, res: Response) => {
    req.session.destroy(function(err) {
        req.logOut();
    });
    res.redirect('/');
})