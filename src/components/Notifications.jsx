import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

function Notifications() {
  const { notifications } = useSelector((state) => state.notifications);
  
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <Box>
      <Paper sx={{ p: 2, maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Thông báo
        </Typography>
        {sortedNotifications.length === 0 ? (
          <Typography>Chưa có thông báo.</Typography>
        ) : (
          <List>
            {sortedNotifications.map((note) => (
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
    </Box>
  );
}

export default Notifications;