import { Paper, Typography } from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
  suffix?: string;
}

function StatCard({ title, value, icon, suffix }: Props) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    let current = 0;

    const interval = setInterval(() => {
      current++;

      setDisplayValue(current);

      if (current >= value) {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        height: "100%",
        textAlign: "center",
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
        }}
      >
        {displayValue}
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
        }}
      >
        {icon}
        {title}
      </Typography>
    </Paper>
  );
}

export default StatCard;
