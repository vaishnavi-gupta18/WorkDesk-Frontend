import React from "react";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import { green, blue, grey, red, orange, purple} from "@material-ui/core/colors";

function colorForStatus(status) {
  switch (status) {
    case "Completed":
      return green;
    case "In Progress":
      return blue;
    case "In progress":
      return blue;
    case "Testing":
      return orange;
    case "testing":
      return orange;
    case "Production":
      return purple;
    case "Production":
      return purple;
    default:
      return grey;
  }
}

function StatusChip({ status, size }) {
  return (
    <Chip
      label={status}
      size={size}
      style={{ backgroundColor: colorForStatus(status)[500], color: "white" }}
    />
  );
}

export default StatusChip;
