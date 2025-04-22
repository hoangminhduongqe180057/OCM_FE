import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid, Button } from "@mui/material";
import DashboardStats from "../components/Dashboard/DashboardStats";
import { BarChart, LineChart, PieChart } from "../components/Dashboard/Charts";
import { fetchDashboardStats } from "../store/slices/dashboardSlice";
import { motion } from "framer-motion";

function DashboardPage() {
  const dispatch = useDispatch();
  const { role, status, fullName } = useSelector((state) => state.auth);
  const stats = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [role, dispatch]);

  const userChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    values: [stats?.stats?.students || 0, 150, 200, 180],
  };

  const courseChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    values: [stats?.stats?.courses || 0, 20, 25, 30],
  };

  const lessonChartData = {
    labels: ["Active", "Inactive"],
    values: [stats?.stats?.instructors || 0, 50],
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: "#FFFFFF" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#14375F" }}>
            Xin chào, {fullName ? fullName : "bạn"}!
          </Typography>
          <Button
            variant="contained"
            href="/courses"
            sx={{
              borderRadius: 2,
              bgcolor: "#E24943",
              "&:hover": { bgcolor: "#E0312E" },
              color: "#FFFFFF",
            }}
          >
            Tạo khóa học
          </Button>
        </Box>
        <DashboardStats />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <BarChart title="Users per Month" data={userChartData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LineChart title="Courses Completed" data={courseChartData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieChart title="Lessons Status" data={lessonChartData} />
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}

export default DashboardPage;