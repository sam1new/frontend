import React, { Fragment } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, Search, AdminPanelSettings } from '@mui/icons-material';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Card } from '@mui/material';
import CheckAuth from '../hoc/CheckAuth';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../redux/slice';

const drawerWidth = 240;

const pages = [
  {
    label: 'Home',
    to: '../',
    icon: <Home />
  },
  {
    label: 'Reserved Rooms',
    to: '../reservedrooms',
    icon: <Search />
  },
  {
    label: 'Admin Panel',
    to: '../admin',
    icon: <AdminPanelSettings />,
    exclusiveId: 1
  }
];

function MainLayout() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(reset());
    sessionStorage.clear();
    nav("../login");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            display: 'block',
            position: 'inherit'
          }}
        >
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ textAlign: 'center' }}>
              Room Reservation
            </Typography>
          </Toolbar>
          <Box sx={{ overflow: 'auto', flex: 1 }}>
            <List>
              {pages.map((page, index) => (
                <Fragment key={index}>
                  {page?.exclusiveId ?
                    (page?.exclusiveId === user?.user_id ?
                      <ListItem disablePadding>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit', width: '100%' }} to={page?.to ? page.to : '/'}>
                          <ListItemButton>
                            <ListItemIcon>
                              {page?.icon ? page.icon : null}
                            </ListItemIcon>
                            <ListItemText primary={page.label} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                      : null)
                    :
                    <ListItem disablePadding>
                      <Link style={{ color: 'inherit', textDecoration: 'inherit', width: '100%' }} to={page?.to ? page.to : '/'}>
                        <ListItemButton>
                          <ListItemIcon>
                            {page?.icon ? page.icon : null}
                          </ListItemIcon>
                          <ListItemText primary={page.label} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  }
                </Fragment>
              ))}
            </List>
          </Box>
          <Box mt={2} p={2}>
            <Card elevation={10} sx={{ padding: '10px' }}>
              <Typography><b>Name: </b> {user?.full_name ? user.full_name : 'N/A'} </Typography>
              <Typography><b>Email: </b>{user?.email ? user.email : 'N/A'}</Typography>
            </Card>
          </Box>
          <Box>
            <Button fullWidth variant='contained' color='info' onClick={handleLogout}>Logout</Button>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default CheckAuth(MainLayout);
