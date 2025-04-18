import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid } from '@mui/material';
import DashboardStats from '../components/DashboardStats';
import { fetchDashboardStats } from '../store/slices/dashboardSlice';

function DashboardPage() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);


  useEffect(() => {
      dispatch(fetchDashboardStats());
  }, [role, dispatch]);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng, {role === 'Admin' ? 'Admin' : 'Giảng viên'}!
      </Typography>
      <DashboardStats />
    </Box>
  );
}

export default DashboardPage;