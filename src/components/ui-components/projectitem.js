import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import LayersIcon from '@mui/icons-material/Layers';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import StatusChip from './statuschip';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Home from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import { Stack } from "@mui/material";

import EditProject from "../project/editproject";
import DeleteProject from "../project/deleteproject";


export default function ProjectItem(props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
            <Box
              sx={{
                pb:  1,
                width: '100%'
              }}
            >
            <ListItem
            sx={{
                maxWidth: 500,
              }}
            secondaryAction={
                <Stack direction='row'  sx={{
                    mb:-10
                }}>
                <IconButton aria-label="edit" sx={{opacity:0.5, '&:hover, &:focus': {opacity : 0.8}}} onClick={() => setEditOpen(true)}>
                  <EditIcon />
                </IconButton>
                <EditProject
                    project_id={props.id}
                    key={props.id}{...props}
                    open={editOpen}
                    setOpen={setEditOpen}
                />
                <IconButton aria-label="delete" sx={{opacity:0.5,'&:hover, &:focus': {opacity : 0.8}}} onClick={() => setDeleteOpen(true)}>
                  <DeleteIcon />
                </IconButton>
                <DeleteProject
                    project_id={props.id}
                    key={props.id}{...props}
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                />
                </Stack>
              }
              disablePadding>

              <ListItemButton
                alignItems="flex-start"
                sx={{
                  maxWidth: 500,
                  px: 3,
                  pt: 2.5,
                  pb: 2.5,
                }}
                
              >
                <ListItemText
                  primary={props.title}
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '1px',
                  }}
                  secondary={ReactHtmlParser(props.description)}
                  secondaryTypographyProps={{
                    fontSize: 13,
                    lineHeight: '16px',
                  }}
                  sx={{ my: 0 }}
                />
                <StatusChip status={props.status} size="small"/>
              </ListItemButton>
              </ListItem>
            </Box>
      </ThemeProvider>
    </Box>
    
  );
}
