import { Router, Request, Response } from 'express';
import Profile from '../models/profiles';
import profilesController from '../controllers/profilesController';

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const profiles = await profilesController.find();

    if (profiles == null) { console.log ('Aucun profil') }
    else {
        res.send(profiles);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const profileId = req.params['id'];

    await Profile.findById(profileId, 'id_ email', (err, profile) => {
        if (err) { console.log('Il y a eu une erreur', err) ; }
        if (profile == null) { console.log('Aucun profil trouvé'); }

        res.send(profile);
    })
});

router.post("/", (req: Request, res: Response) => {
    const { email, firstname, lastname, password } = req.body;

    const newProfile = new Profile ({ email: email, firstname: firstname, lastname: lastname})
    newProfile.setPassword(password);
    newProfile.save();
    res.status(200).send('Utilisateur créé !');
})

router.patch('/:id', (req: Request, res: Response) => {
    const { email, firstname, lastname, password } = req.body;
    console.log('body', req.body);

    const profileId = req.params['id'];
    const updateProfile = profilesController.findByIdAndUpdate(profileId);
    // Pas d'utilisateur
    if (!profileId) { res.status(404).send('Profil non trouvé !'); return; }
    // Pas d'infos dans le body
    if (!firstname && !lastname && !email) {
        res.status(400).send('Il me faut au moins un prénom, un nom ou un email !');
    }
    res.send('Utilisateur modifié');
})

router.delete('/:id', (req: Request, res: Response) => {
    const profileId = req.params['id'];

    const profileDeleted = profilesController.findByIdAndDelete(profileId);
    res.status(200).send('Utilisateur supprimé');
})


export default router;
