// import React from "react";
import { Entry, HealthCheckRating } from "../../types";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

interface Props {
    entry: Entry;
    healthCheckRating: HealthCheckRating;
}

const HealthCheckEntry = ({ entry, healthCheckRating }: Props) => {
    return (
        <div> 
            <div>
                {entry.date} <CheckBoxOutlinedIcon />
            </div>
            <p>{entry.description}</p>
            <p>Specialist: {entry.specialist}</p>
            <p>Health Check Rating: {healthCheckRating}</p>
        </div>
    );
};

export default HealthCheckEntry;