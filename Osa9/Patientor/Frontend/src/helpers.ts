/**
 * Helper function for exhaustive type checking
 */
 export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Helper function for validating date
export const parseDate = (date: unknown): string | boolean => {
  if (!isString(date) || !isDate(date)) {
    return false;
  }
  return date;
};