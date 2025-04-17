import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid } from '@mui/material';
import DashboardStats from '../components/DashboardStats';
import Notifications from '../components/Notifications';
import { fetchDashboardStats } from '../store/slices/dashboardSlice';

function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng, {user?.role === 'Admin' ? 'Admin' : 'Giảng viên'}!
      </Typography>
      <DashboardStats />
      <Notifications />
    </Box>
  );
}

export default DashboardPage;