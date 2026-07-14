import { Container, Typography, Paper, Button, Grid } from "@mui/material";

function Home() {
  return (
    <Container>
      <Paper
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4">Welcome back 👋</Typography>

        <Typography variant="body1">Ready for today's workout?</Typography>

        <Button
          variant="contained"
          color="success"
          sx={{
            mt: 3,
            borderRadius: 3,
            px: 4,
          }}
        >
          Start Workout
        </Button>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography variant="h6">Total Workouts</Typography>

            <Typography variant="h3">18</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography variant="h6">Weekly Progress</Typography>

            <Typography variant="h3">82%</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography variant="h6">Calories Burned</Typography>

            <Typography variant="h3">1430</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
