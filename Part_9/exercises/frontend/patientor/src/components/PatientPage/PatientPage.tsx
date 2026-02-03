import { Patient, Diagnosis, Gender } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import diagnosesService from "../../services/diagnoses";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

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

  return (
    <div>
      <h2>{patient.name}  {findIcon(patient.gender)}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>SSN: {patient.ssn}</p> 
      {patient.entries.length > 0 && (
        <div>
          <h3>Entries:</h3>
          {patient.entries.map(entry => (
            <div key={entry.id}>
              <p>{entry.date}: {entry.description}</p>
            </div>
          ))}
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