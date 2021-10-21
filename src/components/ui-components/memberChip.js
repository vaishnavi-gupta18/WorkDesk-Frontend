import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { green, blue, grey, red, orange, teal} from "@material-ui/core/colors";

export default function MemberChip(props) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip avatar={(props.display_picture!=null)?(<Avatar src={`http://channeli.in${props.display_picture}`}/>):(<Avatar style={{ backgroundColor: blue[300], color: "white" }}>{props.fullname.slice(0,1)}</Avatar>)} 
          label={props.fullname} 
          style={{ backgroundColor: blue[600], color: "white" }}/>
    </Stack>
  );
}
