import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Badge, } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';

function NavBar() {
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  console.log(notifications)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
        {user && ['Admin', 'Instructor'].includes(user.role) && (
          <>
            <Button color="inherit" href="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" href="/courses">
              Khóa học
            </Button>
            {user.role === 'Admin' && (
              <Button color="inherit" href="/users">
                Người dùng
              </Button>
            )}

            <IconButton color="inherit" onClick={handleOpenMenu}>
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
            >
              {notifications.length === 0 ? (
                <MenuItem onClick={handleCloseMenu}>
                  <Typography>Chưa có thông báo</Typography>
                </MenuItem>
              ) : (
                notifications.map((note) => (
                  <MenuItem key={note.id} onClick={handleCloseMenu}>
                    <Typography variant="body2">
                      {note.message} - {new Date(note.timestamp).toLocaleString()}
                    </Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </>
        )}
          <Button color="inherit" onClick={handleLogout}>
            Đăng xuất
          </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;