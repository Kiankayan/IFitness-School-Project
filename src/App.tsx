import { Outlet } from "react-router-dom";
import { NavBar } from "./components/layout";
import { Button } from "@mui/material";
import "./App.css";

export default function App(): React.ReactElement {
  return (
    <>
      <NavBar />

      <Button variant="contained">Test</Button>

      <main>
        <Outlet />
      </main>
    </>
  );
}
