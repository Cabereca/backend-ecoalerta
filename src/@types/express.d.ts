import { type IUser } from '../dtos/UserDTO';

declare global {
    namespace Express {
        export interface Request {
            user?: Partial<IUser>;
        }
    }
}