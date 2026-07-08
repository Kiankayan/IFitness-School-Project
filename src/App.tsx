import { Outlet } from "react-router-dom";
import NavBar from "./components/layout/NavBar";

export default function App(): React.ReactElement {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
