//const express = require("express");
import express from "express";
import fs from "fs";
import type { Request, Response, NextFunction } from "express";
//const fs = require("fs");

const app = express();

const port = 3000;

const sanakirja: { fin: string; eng: string }[] = [];

const data = fs.readFileSync("./sanakirja.txt", {
  encoding: "utf8",
  flag: "r",
});

const splitLines = data.split(/\r?\n/); //jaetaan merkkijono rivin vaihtojen perusteella

splitLines.forEach((line) => {
  // Ohitetaan tyhjät rivit
  if (line.trim() === "") {
    return;
  }

  const sanat = line.split(" ");

  const sana = {
    fin: sanat[0],
    eng: sanat[1],
  };

  sanakirja.push(sana);
});

console.log(sanakirja);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Tehtävä 7 lisäys
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

// GET: etsitään suomenkielisen sanan englanninkielinen vastine
app.get("/sanakirja/:fin", (req: Request, res: Response) => {
  const fin = req.params.fin;

  const sana = sanakirja.find((sana) => sana.fin === fin);

  if (sana) {
    res.json(sana.eng);
  } else {
    res.status(404).json({
      message: "Sanaa ei löytynyt sanakirjasta",
    });
  }
});

// POST: lisätään uusi sana sanakirjaan
app.post("/sanakirja", (req: Request, res: Response) => {
  const { fin, eng } = req.body;

  if (!fin || !eng) {
    res.status(400).json({
      message: "Anna sekä suomenkielinen että englanninkielinen sana",
    });
    return;
  }

  const uusiSana = {
    fin: fin,
    eng: eng,
  };

  // Lisätään sana muistiin
  sanakirja.push(uusiSana);

  // Lisätään sana tekstitiedoston loppuun
  fs.appendFileSync("./sanakirja.txt", `\n${fin} ${eng}`);

  res.status(201).json(uusiSana);
});

app.listen(port, () => {
  console.log(`Kuunnellaan portissa ${port}`);
});
