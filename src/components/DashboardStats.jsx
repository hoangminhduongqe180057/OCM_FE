import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';

function DashboardStats() {
  const { stats, status } = useSelector((state) => state.dashboard);

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
          <Box>
            <Typography variant="h6">Khóa học</Typography>
            <Typography variant="h4">
              {status === 'loading' ? '...' : stats?.courses || 0}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <PeopleIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
          <Box>
            <Typography variant="h6">Học viên</Typography>
            <Typography variant="h4">
              {status === 'loading' ? '...' : stats?.students || 0}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <BookIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
          <Box>
            <Typography variant="h6">Giảng viên</Typography>
            <Typography variant="h4">
              {status === 'loading' ? '...' : stats?.instructors || 0}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardStats;