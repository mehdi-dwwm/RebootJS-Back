import Profile from '../models/profiles';


const find = async () => {
    try {
        const profiles = await Profile.find().exec();
        return profiles;
    }catch (err) {
        return "Il y a eu une erreur";
    }
}
const findByIdAndDelete = (id: string) => {
    try {
        Profile.findByIdAndDelete(id, (err, res) => {
            console.log('res', res);
            return res;
        })
    } catch (error) {
        return "Il y a eu une erreur";
    }
}

const findByIdAndUpdate = (id: string) => {

}

export = {
    find,
    findByIdAndDelete,
    findByIdAndUpdate
}