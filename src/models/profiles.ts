import { Document, Schema, model, Model} from 'mongoose';
import { string } from '@hapi/joi';
import { SHA256 } from 'crypto-js';


export interface Iprofile extends Document {
    email: string;
    lastname : string;
    firstname : string;
    getFullName: () => string;
    setPassword: (password: string) => void;
    verifyPassword: (password: string) => boolean;
}

export const profileSchema = new Schema({
    email: {type: String, required: true, unique: true},
    lastname: {type: String, required: true},
    firstname: {type: String, required: true},
    password: { type: String, require: true}
});


profileSchema.methods.getFullName = function () {
    return `${this.lastname} ${this.firstname}`;
}

profileSchema.methods.setPassword = function (password: string) {
    this.password = SHA256(password).toString();
};

profileSchema.methods.verifyPassword = function (password: string) {
    this.password = SHA256(password).toString();
}

export const Profile = model<Iprofile>("profile", profileSchema);

export default Profile;