import { Repos } from "../repos/Repos";

export class User {
    name?: string;
    email?: string;
    password?: string;
    repos?: Array<Repos> = [];
}