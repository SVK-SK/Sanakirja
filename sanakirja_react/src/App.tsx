import { useState } from "react";
import Haku from "./components/Haku";
import LisaaSana from "./components/LisaaSana";
import "./App.css";

function App() {
  const [sivu, setSivu] = useState("haku");

  return (
    <div className="sovellus">
      <h1>Sanakirja</h1>

      <nav>
        <button onClick={() => setSivu("haku")}>Hae sanaa</button>

        <button onClick={() => setSivu("lisaa")}>Lisää sana</button>
      </nav>

      <main>
        {sivu === "haku" && <Haku />}
        {sivu === "lisaa" && <LisaaSana />}
      </main>
    </div>
  );
}

export default App;
