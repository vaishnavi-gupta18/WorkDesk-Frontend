import React from "react";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import { green, blue, grey, red, orange} from "@material-ui/core/colors";

function colorForStatus(status) {
  switch (status) {
    case "Completed":
      return green;
    case "In Progress":
      return blue;
    case "in progress":
    return blue;
    case "Testing":
      return orange;
    case "testing":
    return orange;
    default:
      return grey;
  }
}

function StatusChip({ status }) {
  return (
    <Chip
      label={status}
    //   avatar={status === "completed" && <DoneIcon style={{ color: "white" }} />}
      style={{ backgroundColor: colorForStatus(status)[300], color: "white" }}
    />
  );
}

export default StatusChip;
