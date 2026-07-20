import {
  getProfile,
  saveProfile,
  clearProfile,
} from "../../services/fakeProfileService";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function Profile() {
  const currentProfile = getProfile();

  const [name, setName] = useState(currentProfile.name);
  const [age, setAge] = useState(currentProfile.age.toString());
  const [height, setHeight] = useState(currentProfile.height.toString());
  const [weight, setWeight] = useState(currentProfile.weight.toString());

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    height: false,
    weight: false,
  });

  function handleSubmit(event: any) {
    event.preventDefault();

    const newErrors = {
      name: name.trim().length < 2,
      age: Number(age) < 1 || Number(age) > 120,
      height: Number(height) < 40 || Number(height) > 250,
      weight: Number(weight) < 2 || Number(weight) > 400,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setOpenErrorSnackbar(true);
      return;
    }

    const profileToSave = {
      id: currentProfile.id,
      name,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
    };

    saveProfile(profileToSave);

    setSnackbarMessage("Profile saved successfully!");
    setOpenSnackbar(true);
  }

  function handleClearProfile() {
    setName("");
    setAge("");
    setHeight("");
    setWeight("");

    clearProfile();

    setErrors({
      name: false,
      age: false,
      height: false,
      weight: false,
    });

    setSnackbarMessage("Profile cleared successfully!");
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
              onChange={(e) => {
                setName(e.target.value);

                if (errors.name) {
                  setErrors({
                    ...errors,
                    name: false,
                  });
                }
              }}
              error={errors.name}
              helperText={
                errors.name ? "Name must contain at least 2 characters." : ""
              }
              fullWidth
            />

            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);

                if (errors.age) {
                  setErrors({
                    ...errors,
                    age: false,
                  });
                }
              }}
              error={errors.age}
              helperText={
                errors.age ? "Age must be between 1 and 120 years." : ""
              }
              fullWidth
            />

            <TextField
              label="Height (cm)"
              type="number"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);

                if (errors.height) {
                  setErrors({
                    ...errors,
                    height: false,
                  });
                }
              }}
              error={errors.height}
              helperText={
                errors.height ? "Height must be between 40 and 250 cm." : ""
              }
              fullWidth
            />

            <TextField
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);

                if (errors.weight) {
                  setErrors({
                    ...errors,
                    weight: false,
                  });
                }
              }}
              error={errors.weight}
              helperText={
                errors.weight ? "Weight must be between 2 and 400 kg." : ""
              }
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

            <Button
              type="button"
              variant="outlined"
              color="error"
              size="large"
              startIcon={<DeleteIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Clear Profile
            </Button>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenErrorSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please fill in all required fields.
        </Alert>
      </Snackbar>

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
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Clear Profile</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear your profile?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="success" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleClearProfile();
              setOpenDialog(false);
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Profile;
