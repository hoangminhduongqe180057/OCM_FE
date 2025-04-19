import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import { motion } from "framer-motion";

function DashboardStats() {
  const { stats, status } = useSelector((state) => state.dashboard);

  const cards = [
    {
      title: "Khóa học",
      value: stats?.courses|| 0,
      icon: <SchoolIcon sx={{ fontSize: 40, color: "#ffffff" }} />,
      link: "/courses",
      gradient: "linear-gradient(135deg, #1976d2, #0288d1)",
    },
    {
      title: "Học viên",
      value: stats?.students || 0,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#ffffff" }} />,
      link: "/users",
      gradient: "linear-gradient(135deg, #0288d1, #4fc3f7)",
    },
    {
      title: "Giảng viên",
      value: stats?.instructors || 0,
      icon: <BookIcon sx={{ fontSize: 40, color: "#ffffff" }} />,
      link: "/users",
      gradient: "linear-gradient(135deg, #4fc3f7, #81d4fa)",
    },
  ];

  cards.map((card) => console.log(card.value))

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={4} key={card.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                background: card.gradient,
                color: "#ffffff",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {card.icon}
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {card.title}
                </Typography>
              </Box>
              <Typography variant="h4">
                {status === "loading" ? "..." : card.value}
              </Typography>
              <Button
                variant="text"
                sx={{ mt: 1, color: "#ffffff", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
                href={card.link}
              >
                Xem chi tiết
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardStats;