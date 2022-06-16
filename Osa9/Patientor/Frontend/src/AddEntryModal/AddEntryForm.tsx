import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { 
  TextField,
  SelectField,
  DiagnosisSelection,
  HealthCheckRatingOption,
  EntryTypeOption
} from "../AddPatientModal/FormField";
import { Entry, EntryType, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { parseDate } from "../helpers";

/*
 * use type Entry, but omit id,
 * because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital entry" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational health entry" },
  { value: EntryType.HealthCheck, label: "Health check entry" }
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const incorrectDateError = "Date is malformed";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!parseDate(values.date)) {
          errors.date = incorrectDateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.Hospital && !values.discharge.date) {
          errors.dischargeDate = requiredError;
        }
        if (values.type === EntryType.Hospital && !parseDate(values.discharge.date)) {
          errors.dischargeDate = incorrectDateError;
        }
        if (values.type === EntryType.Hospital && !values.discharge.criteria) {
          errors.dischargeCriteria = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare && !values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare && values.sickLeave.startDate && !parseDate(values.sickLeave.startDate)) {
          errors.sickLeaveStartDate = incorrectDateError;
        }
        if (values.type === EntryType.OccupationalHealthcare && values.sickLeave.endDate && !parseDate(values.sickLeave.endDate)) {
          errors.sickLeaveEndDate = incorrectDateError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === EntryType.Hospital &&
              <>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            }
            {values.type === EntryType.OccupationalHealthcare &&
              <>
                <Field
                  label="Employer name"
                  placeholder="Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }
            {values.type === EntryType.HealthCheck &&
              <>
                <SelectField
                  label="Health check rating"
                  name="healthCheckRating"
                  options={healthCheckRatingOptions}
                />
              </>
            }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
