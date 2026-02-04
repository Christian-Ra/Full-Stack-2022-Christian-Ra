import { Entry } from "../../types";
import  LocalHospitalOutlinedIcon  from "@mui/icons-material/LocalHospitalOutlined";

interface Props {
    entry: Entry;
    discharge: {
        date: string;
        criteria: string;
    }
}

const HospitalEntry = ({ entry, discharge }: Props) => {
    return (
    <div>
         <div>
                {entry.date} <LocalHospitalOutlinedIcon />
            </div>
        <p>{entry.description}</p>
        <p>Specialist: {entry.specialist}</p>
        <div>
            <strong>Discharge:</strong>
            <p>Date: {discharge.date}</p>
        </div>
    </div>
    );
};

export default HospitalEntry;