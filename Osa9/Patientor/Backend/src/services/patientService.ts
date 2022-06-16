import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  EntryWithoutId,
  Entry
} from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatientByID = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( patientID: string, entry: EntryWithoutId ): Entry => {
  const newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.map(p => p.id === patientID
    ? { ...p, entries: p.entries.push(newEntry) }
    : p
  );
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientByID,
  addPatient,
  addEntry
};