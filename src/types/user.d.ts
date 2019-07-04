
import { ObjectID } from "bson";
import { Document } from "mongoose";

export interface IUser extends Document {

    username: string,
    email: string,
    id: ObjectID,
    matchPassword(pass: string): boolean
    isActive(): boolean
}