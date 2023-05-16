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
import { nav, nav1 } from '@/datas/nav';
import {useRouter} from 'next/router'
import Link from 'next/link'

function TemporaryDrawer({open, setOpen}) {
  const router = useRouter()

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
        {nav.map(({title, route, Icon}, k) => (
          <Link href={route} key={k}>
              <Button sx={{display: 'flex', gap: 3, color: router.pathname===route ? '' : 'neutral.900'}}>
              {<Icon />}{title}
              </Button>
          </Link>
        ))}
      </List>
      <Divider />
      {nav1
      .map(({route, title, Icon}, k) => (
        <Link href={route} key={k}>
            <Button sx={{display: 'flex', gap: 3, color: router.pathname===route ? '' : 'neutral.900'}}>
            {<Icon />}{title}
            </Button>
        </Link>
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