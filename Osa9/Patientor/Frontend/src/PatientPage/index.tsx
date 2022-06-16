import React from 'react';
import axios from "axios";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry } from "../state";
import { Patient, Entry } from "../types";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from '../components/EntryDetails';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(addEntry(newEntry));
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" color="primary" onClick={() => openModal()}>
        Add new entry
      </Button>
    </div>
  );
};

export default PatientPage;