import { Patient, Diagnosis, Gender, Entry } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import React, { useEffect, useState } from "react";
import { assertNever } from "../../constants";
import  HospitalEntry  from "../Entries/HospitalEntry";
import HealthCheckEntry from "../Entries/HealthCheckEntry";
import OccupationalEntry from "../Entries/OccupationalEntry";
import diagnosesService from "../../services/diagnoses";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
// import { Box } from "@mui/material";  //Below import does not work for some reason
//* https://github.com/mui/material-ui/issues/43242   <--- issue link with fix
//? import Box from "@mui/material/Box";

const PatientPage = ( ) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (!id) return;
    patientService.getPatientById(id).then(setPatient);
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
      <h2>{patient.name}  {findIcon(patient.gender)}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>SSN: {patient.ssn}</p> 
      {patient.entries.length > 0 && (
        <div>
          <h3>Entries:</h3>
          {/* <Box sx={{p: 2, border: `1px solid grey`}} > */}
          {patient.entries.map(entry => (
              <EntryDetails entry={entry} />
            ))}
          {/* </Box> */}
      {patient.entries.some(entry => entry.diagnosisCodes) && (
        <ul>
          {patient.entries.flatMap(entry => entry.diagnosisCodes || []).map(code => (
            <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name || "Unknown diagnosis"}</li>
          ))}
        </ul>
      )}
        </div>
      )}
    </div>
  );
};

export default PatientPage;