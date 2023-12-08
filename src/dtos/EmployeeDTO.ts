import { type IOccurrence } from './OccurrenceDTO';

export interface IGetEmployee {
  id: string;
  registrationNumber: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  occurrence: IOccurrence[];
}

export interface ICreateEmployee {
  registrationNumber: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUpdateEmployee {
  id: string;
  registrationNumber?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}
