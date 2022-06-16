import React from "react";
import styled from "styled-components";
import { BiHealth } from "react-icons/bi";
import { FaBriefcase, FaBriefcaseMedical } from "react-icons/fa";

import { Entry } from "../types";
import { assertNever } from "../helpers";
import { useStateValue } from "../state";
import HealthCheckRatingIcon from "./HealthCheckRatingIcon";

const EntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 5px;
  gap: 6px;
`;

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnoses) return null;

  switch(entry.type) {
    case "Hospital":
      return (
        <EntryContainer>
          <div>
            {entry.date}
            <BiHealth style={{ marginLeft: "5px" }} />
          </div>
          <i>{entry.description}</i>
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes?.map(c => 
                <li key={c}>
                  {c} {" "}
                  {Object.values(diagnoses).find(d => d.code === c)?.name}
                </li>
              )}
            </ul>
          }
          {`Discharge ${entry.discharge.date}: ${entry.discharge.criteria}`}
          <br />
          {`diagnose by ${entry.specialist}`}
        </EntryContainer>
      );
    case "OccupationalHealthcare":
      return (
        <EntryContainer>
          <div>
            {entry.date}
            <FaBriefcase style={{ marginLeft: "5px" }} />
            <i style={{ marginLeft: "5px" }}>{entry.employerName}</i>
          </div>
          <i>{entry.description}</i>
          {entry.sickLeave && 
            <>
              <b>Sick leave began: {entry.sickLeave.startDate}</b>
              <b>Sick leave ended: {entry.sickLeave.endDate}</b>
            </>
          }
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes?.map(c => 
                <li key={c}>
                  {c} {" "}
                  {Object.values(diagnoses).find(d => d.code === c)?.name}
                </li>
              )}
            </ul>
          }
          {`diagnose by ${entry.specialist}`}
        </EntryContainer>
      );
    case "HealthCheck":
      return (
        <EntryContainer>
          <div>
            {entry.date}
            <FaBriefcaseMedical style={{ marginLeft: "5px" }} />
          </div>
          <i>{entry.description}</i>
          <HealthCheckRatingIcon rating={entry.healthCheckRating} />
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes?.map(c => 
                <li key={c}>
                  {c} {" "}
                  {Object.values(diagnoses).find(d => d.code === c)?.name}
                </li>
              )}
            </ul>
          }
          {`diagnose by ${entry.specialist}`}
        </EntryContainer>
      );   
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;