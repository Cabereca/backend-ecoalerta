import { promise } from 'zod';
import { prisma } from '../database/prisma';
import { IGetOccurrence, type ICreateOccurrence } from '../dtos/OccurrenceDTO';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from '../helpers/api-errors';

const createOccurrence = async (occurrence: ICreateOccurrence, files: Array<any>) => {
  const { title, description, dateTime, status, location, userId, employeeId } =
    occurrence;
  // console.log(status, dateTime, new Date(dateTime));
  const occ = await prisma.occurrence.create({
    title,
    description,
    dateTime: new Date(dateTime),
    status,
    location: {
      lat: location.lat,
      lng: location.lng
    },
    userId,
    employeeId,
    ImageOccurrence: files
  });

  return occ;
};

const findAllOccurencies = async () => {
  const occs = await prisma.occurrence.findMany();

  return occs as IGetOccurrence[];
};

const findOccurrencies = async (userId: string) => {
  const oc = await prisma.occurrence.findManyByUser(userId);

  const occurrences = await Promise.all(
    oc.map(async (occ) => {
      const images = await prisma.imageOccurrence.findMany({
        where: {
          occurrenceId: occ.id
        }
      });

      // console.log(images);

      return {
        ...occ,
        images,
      }
    }
  ));
  // console.log(occurrences);

  if (!oc) {
    throw new NotFoundError('Occurrence not found');
  }

  return occurrences;
}

const updateOccurencies = async (
  id: string,
  data: Partial<ICreateOccurrence>
) => {
  try {
    const oc = await prisma.occurrence.findUnique({
      where: {
        id
      }
    });

    if (!oc) {
      throw new NotFoundError('Occurrence not found');
    }
    const updatedOccurrence = await prisma.occurrence.update({
      where: {
        id
      },
      data: {
        title: data.title ?? oc.title,
        description: data.description ?? oc.description,
        dateTime: data.dateTime ? new Date(data.dateTime) : oc.dateTime,
      }
    });
    if (!updatedOccurrence) {
      throw new InternalServerError('Error on update occurrence');
    }

    return updatedOccurrence;
  } catch(err) {
    console.log(err);
  }
};

const deleteOccurencies = async (id: string) => {
  const oc = await prisma.occurrence.findUnique({
    where: {
      id
    }
  });
  if (!oc) {
    throw new NotFoundError('Occurrence not found');
  }
  const deletedOccurrence = await prisma.occurrence.delete({
    where: {
      id
    }
  });
  if (!deletedOccurrence) {
    throw new InternalServerError('Error on delete occurrence');
  }
};

const updateOccurrenceStatus = async (
  id: string,
  status: string,
  employeeId: string
) => {
  if (!id || !status) {
    throw new BadRequestError('Id and status are required');
  }
  let newStatus: string;
  switch (status.toLowerCase()) {
    case 'open':
      newStatus = 'open';
      break;
    case 'in_progress':
      newStatus = 'in_progress';
      break;
    case 'resolved':
      newStatus = 'resolved';
      break;
    default:
      throw new BadRequestError('Invalid status');
  }
  const oc = await prisma.occurrence.findUnique({
    where: {
      id
    }
  });
  if (!oc) {
    throw new NotFoundError('Occurrence not found');
  }
  const updatedOccurrence = await prisma.occurrence.update({
    where: {
      id
    },
    data: {
      status: newStatus.toUpperCase(),
      employeeId
    }
  });
  if (!updatedOccurrence) {
    throw new InternalServerError('Error on update occurrence');
  }

  return updatedOccurrence;
};
export default {
  createOccurrence,
  findAllOccurencies,
  findOccurrencies,
  updateOccurencies,
  updateOccurrenceStatus,
  deleteOccurencies
};
