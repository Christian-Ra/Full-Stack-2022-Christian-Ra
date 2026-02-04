import { Entry } from "../../types";
import MedicalServicesOutlinedIcon  from '@mui/icons-material/MedicalServicesOutlined';

interface Props {
    entry: Entry;
    employer: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}


const OccupationalEntry = ({ entry, employer, sickLeave }: Props) => {
    return (
        <div>
            <div>
                {entry.date} <MedicalServicesOutlinedIcon />
            </div>
            <p>{entry.description}</p>
            <p>Specialist: {entry.specialist}</p>
            <p>Employer: {employer}</p>
            {sickLeave && (
                <div>
                    <h3>Sick Leave</h3>
                    <p>Start Date: {sickLeave.startDate}</p>
                    <p>End Date: {sickLeave.endDate}</p>
                </div>
            )}
        </div>
    );
};

export default OccupationalEntry;