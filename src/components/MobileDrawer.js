import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {MdHome} from 'react-icons/md'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { nav } from '@/datas/nav';

function TemporaryDrawer({open, setOpen}) {

  const toggleDrawer = (open) => (event) => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{width: 250}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {nav.map(({title, route}, k) => (
          <ListItem key={k} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MdHome size={18}/>
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {['Login', 'Register'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MdHome size={18}/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
    </Box>
  );

  return (
    <div className='mobile-drawer'>
        <Drawer
          anchor='right'
          open={open}
          onClose={toggleDrawer(false)}
        >
        <div className="close-button" style={{
          margin: '15px',
          cursor: 'pointer'
        }}
        onClick={() => setOpen(false)}
        >
          <AiOutlineCloseCircle size={28} />
        </div>
          {list()}
        </Drawer>
    </div>
  );
}



export default TemporaryDrawer