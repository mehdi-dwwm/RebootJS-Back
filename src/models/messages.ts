import { Document, Schema, model, Model} from 'mongoose';


export interface IMessage extends Document {
    targets : string[];
    conversationId: string;
    emitter : string;
    content : string;
    createdAt : Date;
}


const messageSchema = new Schema({
    targets: {type: [{type: Schema.Types.ObjectId, ref: "profile", required: true}]},
    conversationId: {type: String, required: true},
    emitter: {type: Schema.Types.ObjectId,ref: "profile", required: true},
    content: { type: String, require: true},
    createdAt: { type : Schema.Types.Date, required: true}
})

export const Message = model<IMessage, Model<IMessage>>("message", messageSchema);