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
        backgroundColor: "#14375F", // Xanh đậm
      },
    ],
  };

  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 2, backgroundColor: "#FFFFFF" }} elevation={1}>
      <Typography variant="h6" sx={{ color: "#14375F" }}>{title}</Typography>
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
        borderColor: "#6D8199", // Xanh xám nhạt
        backgroundColor: "rgba(109, 129, 153, 0.2)", // Fill nhẹ
        fill: true,
      },
    ],
  };

  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 2, backgroundColor: "#FFFFFF" }} elevation={1}>
      <Typography variant="h6" sx={{ color: "#14375F" }}>{title}</Typography>
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
        backgroundColor: ["#14375F", "#6D8199", "#E24943"], // Xanh đậm, xanh xám nhạt, đỏ cam
      },
    ],
  };

  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 2, backgroundColor: "#FFFFFF" }} elevation={1}>
      <Typography variant="h6" sx={{ color: "#14375F" }}>{title}</Typography>
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