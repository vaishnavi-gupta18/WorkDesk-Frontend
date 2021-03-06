import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import moment from 'moment'
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import PersistentDrawerLeft from '../ui-components/drawer';
import FormDialog from '../project/addproject'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from "@mui/material/Stack";

import StatusChip from './statuschip'
import MemberChip from "./memberChip";


export default function ProjectAccordion(props) {

        return (
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >

                <Typography variant="h5" sx ={{ width: "95%"}}>{props.data && props.data.title}</Typography>
                <StatusChip status={props.data && props.data.status} />
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant="subtitle" >Created on {props && props.data && moment(props.data.start_date).format("MMM Do YYYY, h:mm a")} </Typography>
                {ReactHtmlParser(props.data && props.data.description)}
                <Stack direction="row" spacing={1}>
                {props.data && props.data.members.map(member=>{
                        return (<MemberChip key={member.id} {...member}/>)
                    })}
                </Stack>
                </AccordionDetails>
            </Accordion>
        );

}