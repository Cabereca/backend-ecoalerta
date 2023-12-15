import { type IOccurrence } from "./OccurrenceDTO";

export interface IUser {
    id: string;
    cpf: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    occurrence: IOccurrence[];
}

export interface IUserInputDTO {
    cpf: string;
    name: string;
    email: string;
    phone: string;
    password: string;
}

