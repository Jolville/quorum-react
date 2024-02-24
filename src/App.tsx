import "./index.css";
import { Nav } from "./nav";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
