// import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Badge, } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../store/slices/authSlice';
// import NotificationsIcon from '@mui/icons-material/Notifications';

// function NavBar() {
//   const { user } = useSelector((state) => state.auth);
//   const { notifications } = useSelector((state) => state.notifications);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const sortedNotifications = [...notifications].sort(
//     (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//   );

//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login', { replace: true });
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Quản lý Khóa học
//         </Typography>
//         {user && ['Admin', 'Instructor'].includes(user.role) && (
//           <>
//             <Button color="inherit" href="/dashboard">
//               Dashboard
//             </Button>
//             <Button color="inherit" href="/courses">
//               Khóa học
//             </Button>
//             {user.role === 'Admin' && (
//               <Button color="inherit" href="/users">
//                 Người dùng
//               </Button>
//             )}

//             <IconButton color="inherit" onClick={handleOpenMenu}>
//               <Badge badgeContent={notifications.length} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleCloseMenu}
//               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//               transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//               {sortedNotifications.length === 0 ? (
//                 <MenuItem onClick={handleCloseMenu}>
//                   <Typography>Chưa có thông báo</Typography>
//                 </MenuItem>
//               ) : (
//                 sortedNotifications.map((note) => (
//                   <MenuItem key={note.id} onClick={handleCloseMenu}>
//                     <Typography variant="body2">
//                       {note.message} {new Date(note.timestamp).toLocaleString()}
//                     </Typography>
//                   </MenuItem>
//                 ))
//               )}
//             </Menu>
//           </>
//         )}
//           <Button color="inherit" onClick={handleLogout}>
//             Đăng xuất
//           </Button>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default NavBar;

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge,
  Box,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { logout } from '../store/slices/authSlice';
import { removeNotification } from '../store/slices/notificationSlice';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

function NavBar() {
  const { role } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRemoveNotification = (id) => {
    dispatch(removeNotification(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Quản lý Khóa học
        </Typography>
        {role && ['Admin', 'Instructor'].includes(role) && (
          <>
            <Button color="inherit" href="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" href="/courses">
              Khóa học
            </Button>
            {role === 'Admin' && (
              <Button color="inherit" href="/users">
                Người dùng
              </Button>
            )}
            <IconButton 
              color="inherit" 
              onClick={handleOpenMenu} 
              sx={{
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  minWidth: 300,
                  maxHeight: 400,
                  overflowY: 'auto',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  borderRadius: 2,
                },
              }}
            >
              {sortedNotifications.length === 0 ? (
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Chưa có thông báo
                  </Typography>
                </Box>
              ) : (
                <List sx={{ py: 0 }}>
                  {sortedNotifications.map((note, index) => (
                    <Box key={note.id}>
                      <ListItem
                        sx={{
                          py: 1,
                          px: 2,
                          '&:hover': {
                            backgroundColor: 'grey.100',
                            transition: 'background-color 0.2s',
                          },
                        }}
                        onClick={handleCloseMenu}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <InfoIcon color="info" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={note.message}
                          secondary={formatDistanceToNow(new Date(note.timestamp), {
                            addSuffix: true,
                            locale: vi,
                          })}
                          primaryTypographyProps={{
                            variant: 'body2',
                            fontWeight: 'medium',
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            color: 'text.secondary',
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNotification(note.id);
                          }}
                          sx={{ ml: 1 }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </ListItem>
                      {index < sortedNotifications.length - 1 && (
                        <Divider sx={{ mx: 2 }} />
                      )}
                    </Box>
                  ))}
                </List>
              )}
            </Menu>
          </>
        )}
        {role ? (
          <Button color="inherit" onClick={handleLogout}>
            Đăng xuất
          </Button>
        ) : (
          <Button color="inherit" href="/login">
            Đăng nhập
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;