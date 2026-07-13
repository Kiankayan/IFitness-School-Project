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
              <NavLink to="/">Home</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/workouts">Workouts</NavLink>
            </Box>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">
                    Workouts
                  </NavLink>
                </li>
              </ul>
            </div>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
