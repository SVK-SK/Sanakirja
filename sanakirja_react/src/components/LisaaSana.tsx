import { useState, type FormEvent } from "react";

function LisaaSana() {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [viesti, setViesti] = useState("");
  const [virhe, setVirhe] = useState("");

  async function lisaaSana(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setViesti("");
    setVirhe("");

    if (!fin.trim() || !eng.trim()) {
      setVirhe("Täytä molemmat kentät.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/sanakirja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fin: fin.trim(),
          eng: eng.trim(),
        }),
      });

      if (!response.ok) {
        setVirhe("Sanan lisääminen epäonnistui.");
        return;
      }

      setViesti(`Lisättiin: ${fin.trim()} – ${eng.trim()}`);
      setFin("");
      setEng("");
    } catch {
      setVirhe("Yhteys palvelimeen epäonnistui.");
    }
  }

  return (
    <div>
      <h2>Lisää uusi sana</h2>

      <form onSubmit={lisaaSana}>
        <label htmlFor="fin">Suomeksi:</label>
        <br />

        <input
          id="fin"
          type="text"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
        />

        <br />

        <label htmlFor="eng">Englanniksi:</label>
        <br />

        <input
          id="eng"
          type="text"
          value={eng}
          onChange={(e) => setEng(e.target.value)}
        />

        <br />

        <button type="submit">Lisää sana</button>
      </form>

      {viesti && <p>{viesti}</p>}
      {virhe && <p>{virhe}</p>}
    </div>
  );
}

export default LisaaSana;
