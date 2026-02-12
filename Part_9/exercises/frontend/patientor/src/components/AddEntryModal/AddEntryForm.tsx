import { EntryFormValues } from "../../types";
import { useState } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}


const AddEntryForm = ({onCancel, onSubmit}: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState(0);

    const addEntry = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitting new entry with values:", {
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating
        });
        onSubmit({
            type: "HealthCheck",
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating
        });
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <input
                    type="text"
                    placeholder="Specialist"
                    value={specialist}
                    onChange={({target}) => setSpecialist(target.value)}
                    />
                <input
                    type="text"
                    placeholder="Diagnosis Codes (comma separated)"
                    value={diagnosisCodes.join(',')}
                    onChange={({ target }) => setDiagnosisCodes(target.value.split(',').map(code => code.trim()))}
                />
                <input
                    type="number"
                    placeholder="Health Check Rating (0-3)"
                    value={healthCheckRating}
                    onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                    min={0}
                    max={3}
                />
                <button type="submit">Add Entry</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddEntryForm;