import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Paper, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart({ title, data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        backgroundColor: "#1976d2",
      },
    ],
  };

  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 2 }} elevation={1}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ height: 300 }}>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
          }}
        />
      </Box>
    </Paper>
  );
}

export function LineChart({ title, data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        borderColor: "#0288d1",
        backgroundColor: "rgba(2, 136, 209, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 2 }} elevation={1}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ height: 300 }}>
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
          }}
        />
      </Box>
    </Paper>
  );
}

export function PieChart({ title, data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["#1976d2", "#0288d1", "#f44336"],
      },
    ],
  };

  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 2 }} elevation={1}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ height: 300 }}>
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
          }}
        />
      </Box>
    </Paper>
  );
}