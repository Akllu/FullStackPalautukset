import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { Patient } from "../types";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from '../components/EntryDetails';

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (id && patient?.id !== id) {
      void fetchPatient(id);
    }
  }, [dispatch]);

  if (!patient) return null;

  return (
    <div>
      <h2>{patient.name} <GenderIcon gender={patient.gender} /></h2>
      <p>
        ssh: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      <h3>entries</h3> 
      {patient.entries.length > 0 && patient.entries.map(e =>
        <EntryDetails key={e.id} entry={e}/>
      )}
    </div>
  );
};

export default PatientPage;