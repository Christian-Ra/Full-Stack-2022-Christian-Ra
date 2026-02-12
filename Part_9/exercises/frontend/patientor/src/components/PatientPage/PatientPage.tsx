import { Patient, Diagnosis, Gender, Entry, EntryFormValues } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import React, { useEffect, useState } from "react";
import { assertNever } from "../../constants";
import axios from "axios";
import  HospitalEntry  from "../Entries/HospitalEntry";
import HealthCheckEntry from "../Entries/HealthCheckEntry";
import OccupationalEntry from "../Entries/OccupationalEntry";
import diagnosesService from "../../services/diagnoses";
import AddEntryModal from "../AddEntryModal/EntryIndex";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Button } from "@mui/material";  //Below import does not work for some reason
//* https://github.com/mui/material-ui/issues/43242   <--- issue link with fix
//? import Box from "@mui/material/Box";

const PatientPage = ( ) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!id) return;
    void patientService.getPatientById(id).then(setPatient);
  }, [id]);

  useEffect(() => {
    void diagnosesService.getAll().then((data) => {
      console.log("Fetched diagnoses data:", data);
      setDiagnoses(data);
    });
  }, []);
  
  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  const findIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return null;
    }
  };

    const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      console.log("New entry created:", entry);
      setPatient({...patient, entries: [...patient.entries, entry]});
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    console.log("Rendering entry:", entry);
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} discharge={entry.discharge} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} healthCheckRating={entry.healthCheckRating} />;
      case "OccupationalHealthcare":
        return <OccupationalEntry entry={entry} employer={entry.employerName} sickLeave={entry.sickLeave} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <AddEntryModal modalOpen={modalOpen} onClose={() => { setModalOpen(false); setError(undefined); }} onSubmit={submitNewEntry} error={error}/>
      <Button variant="contained" onClick={() => setModalOpen(true)}>Add New Entry</Button>
      <h2>{patient.name}  {findIcon(patient.gender)}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>SSN: {patient.ssn}</p> 
      {patient.entries.length > 0 && (
        <div>
          <h3>Entries:</h3>
          {patient.entries.map(entry => (
          <Box sx={{p: 2, border: `1px solid grey`}} >
              <EntryDetails entry={entry} />
          </Box>
            ))}
      {patient.entries.some(entry => entry.diagnosisCodes) && (
        <ul>
          {patient.entries.flatMap(entry => entry.diagnosisCodes || []).map(code => (
            <li>{code} {diagnoses.find(d => d.code === code)?.name || "Unknown diagnosis"}</li>
          ))}
        </ul>
      )}
        </div>
      )}
    </div>
  );
};

export default PatientPage;