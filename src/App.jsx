import { useState } from "react";
import FormPage from "./pages/FormPage.jsx";
import RecordsPage from "./pages/RecordsPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./index.scss";

function App() {
  const [activeTab, setActiveTab] = useState("cadastro");

  return (
    <div className={`vh-100 vw-100 d-flex flex-column`}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === "cadastro" ? <FormPage /> : <RecordsPage />}
      </div>
    </div>
  );
}

export default App;