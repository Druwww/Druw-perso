import { Timestamp } from "firebase/firestore";

export const ROOT_ROUTE = '/';
export const LOGIN_ROUTE = '/login';

export const SESSION_COOKIE_NAME = 'user_session';

export type UserData = {
    email : string,
    uid: string,
    createdAt: Timestamp,
    lastLogin: Timestamp,
}