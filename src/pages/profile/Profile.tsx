import { getProfile, saveProfile } from "../../services/fakeProfileService";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";

function Profile() {
  const currentProfile = getProfile();
  const [name, setName] = useState(currentProfile.name);
  const [age, setAge] = useState(currentProfile.age.toString());
  const [height, setHeight] = useState(currentProfile.height.toString());
  const [weight, setWeight] = useState(currentProfile.weight.toString());
  const [openSnackbar, setOpenSnackbar] = useState(false);

  function handleSubmit(event: any) {
    event.preventDefault();
    const profileToSave = {
      id: currentProfile.id,
      name,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
    };
    saveProfile(profileToSave);

    setOpenSnackbar(true);
  }

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "success.main",
              mx: "auto",
              mb: 2,
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Update your personal information.
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
            />

            <TextField
              label="Height (cm)"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              fullWidth
            />

            <TextField
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              startIcon={<SaveIcon />}
            >
              Save Profile
            </Button>
          </Stack>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Profile saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default Profile;
