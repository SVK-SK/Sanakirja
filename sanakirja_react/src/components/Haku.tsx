import { useState, type FormEvent } from "react";

function Haku() {
  const [hakusana, setHakusana] = useState("");
  const [vastaus, setVastaus] = useState("");
  const [virhe, setVirhe] = useState("");

  async function haeSana(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setVastaus("");
    setVirhe("");

    if (!hakusana.trim()) {
      setVirhe("Kirjoita ensin suomenkielinen sana.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/sanakirja/${encodeURIComponent(hakusana.trim())}`,
      );

      if (!response.ok) {
        setVirhe("Sanaa ei löytynyt sanakirjasta.");
        return;
      }

      const data: string = await response.json();
      setVastaus(data);
    } catch {
      setVirhe("Yhteys palvelimeen epäonnistui.");
    }
  }

  return (
    <div>
      <h2>Sanojen haku</h2>

      <form onSubmit={haeSana}>
        <label htmlFor="hakusana">Suomenkielinen sana:</label>
        <br />

        <input
          id="hakusana"
          type="text"
          value={hakusana}
          onChange={(e) => setHakusana(e.target.value)}
        />

        <button type="submit">Hae</button>
      </form>

      {vastaus && (
        <p>
          Englanniksi: <strong>{vastaus}</strong>
        </p>
      )}

      {virhe && <p>{virhe}</p>}
    </div>
  );
}

export default Haku;
