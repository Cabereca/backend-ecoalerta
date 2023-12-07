import { type IOccurrence } from "./OccurrenceDTO";

export interface IEmployee {
    id: string,
    cpf: string,
    name: string,
    email: string,
    phone: string,
    password: string,
    occurrence: IOccurrence[]
}