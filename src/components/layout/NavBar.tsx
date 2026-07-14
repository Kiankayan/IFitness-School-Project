import { NavLink, Link } from "react-router-dom";
import { Container } from "@mui/material";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function NavBar(): React.ReactElement {
  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h6">iFitness</Typography>
            </Link>
            <Box sx={{ display: "flex", gap: 3 }}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
              >
                Home
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/workouts"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Workouts
              </NavLink>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
