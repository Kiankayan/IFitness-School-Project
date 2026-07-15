import { Paper, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
  suffix?: string;
}

function StatCard({ title, value, icon, suffix }: Props) {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        height: "100%",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
        }}
      >
        {value}
        {suffix}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mt: 2,
          ml: -2,
        }}
      >
        {icon}
        {title}
      </Typography>
    </Paper>
  );
}

export default StatCard;
