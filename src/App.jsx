import "/tailwind/Output.css";
import Sidenav from "./Components/Sidenav";
import Compose from "./Components/Compose";
import { Route, Router, Routes } from "react-router-dom";
import Inbox from "./Components/Inbox";
import Drafts from "./Components/Drafts";
import Sent from "./Components/Sent";
import Bin from "./Components/Bin";

function App() {
  return (
    <>
      <Sidenav />
      <Routes>
        <Route path="/" index element={<Inbox />} />
        <Route path="/mail" element={<Compose />} />
        <Route path="/draft" element={<Drafts />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/bin" element={<Bin />} />
      </Routes>
    </>
  );
}

export default App;
