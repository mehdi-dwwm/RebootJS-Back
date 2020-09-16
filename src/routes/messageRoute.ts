import { Router, Request, Response } from 'express';
import { IProfile } from '../models/profiles';
import * as messageController from '../controllers/messages';
import { authenticationRequired } from '../middlewares/authenticationRequired';


const router = Router();

router.get("/:conversationId", authenticationRequired, async (req: Request, res: Response) => {
    if(!req.user) { return res.status(401).send('You must be authentificated')};
    return await messageController.getAllMessages(req.user as IProfile, req.params['conversationID']);
});
  
router.get("/", authenticationRequired, async (req: Request, res: Response) => {
    if (!req.user) {return res.status(401).send('You must be authenticated')};
    return await messageController.getAllMessages(req.user as IProfile, req.params['conversationId']);
});

router.post("/", authenticationRequired, async (req: Request, res: Response) => {
    if(!req.user) { return res.status(401).send('You must be authenticated')};
    const { conversationId, targets, content, emitter } = req.body;
    return await messageController.createMessage(req.user as IProfile, conversationId, targets, emitter, content);
})


export default router;
