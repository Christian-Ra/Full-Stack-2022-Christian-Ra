// import React from "react";
import { Entry, HealthCheckRating } from "../../types";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { assertNever } from "../../constants";

interface Props {
    entry: Entry;
    healthCheckRating: HealthCheckRating;
}

const HealthCheckEntry = ({ entry, healthCheckRating }: Props) => {

    const renderHealthIcon = (rating: HealthCheckRating) => {
        switch (rating) {
            case HealthCheckRating.Healthy:
                return <FavoriteOutlinedIcon sx={{ color: "green" }} />;
            case HealthCheckRating.LowRisk:
                return <FavoriteOutlinedIcon sx={{ color: "yellow" }} />;
            case HealthCheckRating.HighRisk:
                return <FavoriteOutlinedIcon sx={{ color: "orange" }} />;
            case HealthCheckRating.CriticalRisk:
                return <FavoriteOutlinedIcon sx={{ color: "red" }} />;
            default:
                return assertNever(rating);
        }
    };

    return (
        <div> 
            <div>
                {entry.date} <CheckBoxOutlinedIcon />
            </div>
            <p>{entry.description}</p>
            <p>Specialist: {entry.specialist}</p>
            <p>Health Check Rating: {healthCheckRating} {renderHealthIcon(healthCheckRating)}</p>
        </div>
    );
};

export default HealthCheckEntry;