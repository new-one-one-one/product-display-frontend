import React from "react";
import CompleteStar from "@mui/icons-material/Star";
import EmptyStar from "@mui/icons-material/StarBorder";
import StarHalf from "@mui/icons-material/StarHalf";

export const StarDisplayer = ({ power = 5 }) => {
  const decimal = power % 1;
  const finalData = Array(power - decimal).fill(<CompleteStar />);

  if (decimal) {
    finalData.push(<StarHalf />);
    finalData.push(Array(5 - Math.ceil(power)).fill(<EmptyStar />));
  } else {
    finalData.push(Array(5 - power).fill(<EmptyStar />));
  }

  return <>{finalData}</>;
};
