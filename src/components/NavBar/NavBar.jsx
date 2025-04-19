import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { logout } from "../../store/slices/authSlice";
import { removeNotification } from "../../store/slices/notificationSlice";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

function NavBar({ toggleSidebar, openSidebar }) {
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
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={toggleSidebar}
          sx={{ mr: 2, display: { xs: "block", sm: "block" }, "&:focus": { outline: "none"}, }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Quản lý Khóa học
        </Typography>
        {role && ["Admin", "Instructor"].includes(role) && (
          <>
            <Button color="inherit" href="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" href="/courses">
              Khóa học
            </Button>
            {role === "Admin" && (
              <Button color="inherit" href="/users">
                Người dùng
              </Button>
            )}
            <IconButton
              color="inherit"
              onClick={handleOpenMenu}
              sx={{
                "&:focus": {
                  outline: "none",
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
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  minWidth: 300,
                  maxHeight: 400,
                  overflowY: "auto",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
                          "&:hover": {
                            backgroundColor: "grey.100",
                            transition: "background-color 0.2s",
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
                            variant: "body2",
                            fontWeight: "medium",
                          }}
                          secondaryTypographyProps={{
                            variant: "caption",
                            color: "text.secondary",
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