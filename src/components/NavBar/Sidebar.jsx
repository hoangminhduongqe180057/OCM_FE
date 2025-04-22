import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";

function Sidebar({ open, toggleSidebar }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Courses", path: "/courses", icon: <SchoolIcon /> },
    { text: "Users", path: "/users", icon: <PeopleIcon /> },
    { text: "Lessons", path: "/lessons", icon: <BookIcon /> },
  ];

  return (
    <Drawer
      variant={isMobile || !open ? "temporary" : "permanent"}
      open={open}
      onClose={toggleSidebar}
      sx={{
        //position: "fixed",
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          background: "linear-gradient(180deg, #14375F, #6D8199)", // Gradient xanh đậm đến xanh xám nhạt
          border: "none",
          boxShadow: "3px 0 12px rgba(0,0,0,0.15)",
          top: 64,
          height: "calc(100% - 64px)",
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button='true'
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) toggleSidebar();
            }}
            sx={{
              py: 1.5,
              "&:hover": {
                cursor: "pointer",
                bgcolor: "#6D8199", // Xanh xám nhạt khi hover
                "& .MuiListItemText-primary": { color: "#FFFFFF", fontWeight: 600 },
                "& .MuiListItemIcon-root": { color: "#FFFFFF" },
              },
            }}
          >
            <ListItemIcon sx={{ color: "#FFFFFF", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ color: "#FFFFFF", fontSize: 16 }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;