import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#0288d1" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    error: { main: "#f44336" },
  },
  typography: {
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;