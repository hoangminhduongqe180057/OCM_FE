import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, Paper, Snackbar, Alert } from '@mui/material';
import { initializeSignalR, stopSignalR } from '../services/signalr';
import { addNotification } from '../store/slices/notificationSlice';

function Notifications() {
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications);
  const isMountedRef = useRef(false);

  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      initializeSignalR((message) => {
        if (isMountedRef.current) {
          dispatch(addNotification(message));
          console.log(message, isMountedRef)
          setToastMessage(message);
          setOpenToast(true);
        }
      });
    }

    return () => {
      isMountedRef.current = false;
      stopSignalR();
    };
  }, [user, dispatch]);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenToast(false);
  };

  return (
    <Box>
      <Paper sx={{ p: 2, maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Thông báo
        </Typography>
        {notifications.length === 0 ? (
          <Typography>Chưa có thông báo.</Typography>
        ) : (
          <List>
            {notifications.map((note) => (
              <ListItem key={note.id}>
                <ListItemText
                  primary={note.message}
                  secondary={new Date(note.timestamp).toLocaleString()}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Notifications;