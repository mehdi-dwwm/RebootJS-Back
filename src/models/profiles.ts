import { Document, Schema, model, Model} from 'mongoose';

interface Iprofile extends Document {
    email: string;
    lastname : string;
    firstname : string;
}

export const profileSchema = new Schema({
    email: {type: String, required: true, unique: true},
    lastname: {type: String, required: true},
    firstname: {type: String, required: true}
});

export const Profile = model<Iprofile>("profile", profileSchema);