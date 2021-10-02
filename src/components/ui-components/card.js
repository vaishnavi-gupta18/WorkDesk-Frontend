import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { red, blue } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ReactHtmlParser from 'react-html-parser';

import StatusChip from './statuschip'
import DialogModal from '../project/editproject'

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    background: 'linear-gradient( rgb(255 255 255) 30%, rgb(245 249 255) 90%)',
    borderRadius: 12,
  },
  action: {
      justifyContent: 'right'
  }
});

export default function ProjectCard(props) {
  const [editOpen, setEditOpen] = useState(false);
  const classes = useStyles();
  const description = props.description ;
  var date = props.start_date;
  date = date.slice(0,10);
  var time = props.start_date;
  time = time.slice(11,16);
  const start_date = 'Created '+date+','+time
  return (
    <Card className={classes.root} raised>
        <CardHeader
        action={
            <StatusChip status={props.status} />
        }
        title={props.title}
        subheader={start_date}
      />
      <CardContent>
            {ReactHtmlParser(description)}
      </CardContent>
      <CardActions className={classes.action}>
        <IconButton style={{ color: blue[800] }} aria-label="Edit" onClick={() => setEditOpen(true)}>
          <EditIcon />
        </IconButton>
        <DialogModal
        project_id={props.id}
        open={editOpen}
        setOpen={setEditOpen}
      />
        <IconButton style={{ color: red[400] }} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
