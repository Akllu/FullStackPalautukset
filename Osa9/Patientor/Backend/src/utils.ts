import {
  NewPatient,
  Gender,
  EntryWithoutId,
  Diagnosis,
  EntryType,
  BaseEntry,
  Discharge,
  SickLeave,
  HealthCheckRating
} from './types';

//#region Patient
type PatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isSSN = (ssn: string): boolean => {
  return !isNaN(Number(ssn.substring(0, 6)));
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};


export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseName(occupation),
    entries: []
  };
  return newEntry;
};

//#endregion

//#region Entry
type EntryFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown,
  type: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown,
  healthCheckRating?: unknown
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Incorrect or missing description: ' + desc);
  }
  return desc;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing description: ' + specialist);
  }
  return specialist;
};

const isStringArray = (array: unknown): array is string[] => {
  return (array instanceof Array) && array.every(i => typeof i === 'string');
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !isStringArray (diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (entry: any): entry is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(entry);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing entry type: ' + type);
  }
  return type;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return typeof discharge === 'object';
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)  || !parseDate(discharge.date) || !parseName(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  return typeof sickLeave === 'object';
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave) || !parseDate(sickLeave.startDate) || !parseDate(sickLeave.endDate)) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating; 
};

export const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  discharge,
  employerName,
  sickLeave,
  healthCheckRating
}: EntryFields): EntryWithoutId => {

  const baseEntry: Omit<BaseEntry, 'id'> = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes) : undefined
  };

  const entryType = parseType(type);
  switch (entryType) {
    case EntryType.Hospital:
      return {
        ...baseEntry,
        type: entryType,
        discharge: parseDischarge(discharge)
      };
    case EntryType.OccupationalHealthcare:
      return {
        ...baseEntry,
        type: entryType,
        employerName: parseName(employerName),
        sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined
      };
    case EntryType.HealthCheck:
      return {
        ...baseEntry,
        type: entryType,
        healthCheckRating: parseHealthCheckRating(healthCheckRating) 
      };
    default:
      throw new Error('Unexpected error!');
  }
};

//#endregion