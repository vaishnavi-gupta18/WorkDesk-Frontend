import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar"
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { red, blue } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack'
import ReactHtmlParser from 'react-html-parser';
import { useHistory } from 'react-router-dom';

import StatusChip from './statuschip'
import DialogModal from '../project/editproject'
import DialogDelete from '../project/deleteproject'
import MemberChip from './memberChip'

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    background: 'linear-gradient( rgb(255 255 255) 30%, rgb(245 249 255) 90%)',
    borderRadius: 12,
    margin: 10,
  },
  action: {
      justifyContent: 'space-between'
  }
});


export default function UserCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised sx={{ margin:3, width: 500 }}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
          {props.fullname.slice(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <FavoriteIcon /> */}
          </IconButton>
        }
        title={props.fullname}
        subheader={()=> {
          switch(props.year){
            case 1:
              return "Webmaster";
            case 2:
              return "Project Associate";
            case 3:
              return "Project Leader";
            case 4:
              return "Project Leader";
            default:
              return "Emeritus Coordinator";
          }

        }
          
        }
      />
    </Card>
  );
}
