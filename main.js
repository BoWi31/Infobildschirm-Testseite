// ChancenSpiel Vollversion – Hauptlogik (vereinfacht für Demonstration)
let spielDaten = {
  name: "",
  phase: 0,
  biografie: [],
};

function zeigeStart() {
  document.getElementById("gameContainer").innerHTML = `
    <h2>Willkommen im ChancenSpiel</h2>
    <p>Wähle deinen Modus:</p>
    <button onclick="startGame()">Klassisches Spiel</button>
    <button onclick="startBackwards()">Rückwärtssuche</button>
  `;
}

function startGame() {
  spielDaten.phase = 1;
  spielDaten.biografie = [];
  zeigeNamenEingabe();
}

function zeigeNamenEingabe() {
  document.getElementById("gameContainer").innerHTML = `
    <p>Wie heißt du?</p>
    <input type="text" id="nameInput" />
    <button onclick="speichereName()">Weiter</button>
  `;
}

function speichereName() {
  const name = document.getElementById("nameInput").value.trim();
  if (name.length > 0) {
    spielDaten.name = name;
    zieheHerkunft();
  }
}

function zieheHerkunft() {
  const karten = ["Akademikereltern", "Hauptschuleltern", "Eltern ohne Abschluss"];
  const gezogen = karten[Math.floor(Math.random() * karten.length)];
  spielDaten.biografie.push("Herkunft: " + gezogen);
  document.getElementById("gameContainer").innerHTML = `
    <p>Gezogene Herkunftskarte: <strong>${gezogen}</strong></p>
    <button onclick="zieheModifikator()">Weiter</button>
  `;
}

function zieheModifikator() {
  const modis = ["Armut", "Mehrsprachigkeit", "Keine Förderung", "Nichts"];
  const gezogen = modis[Math.floor(Math.random() * modis.length)];
  spielDaten.biografie.push("Modifikator: " + gezogen);
  document.getElementById("gameContainer").innerHTML = `
    <p>Modifikator gezogen: <strong>${gezogen}</strong></p>
    <button onclick="zeigeBiografie()">Biografie anzeigen</button>
  `;
}

function zeigeBiografie() {
  const eintraege = spielDaten.biografie.map(e => `<li>${e}</li>`).join("");
  document.getElementById("gameContainer").innerHTML = `
    <h3>Deine Bildungsbiografie:</h3>
    <ul>${eintraege}</ul>
    <button onclick="zeigeRueckwaertssuche()">Rückwärtssuche zur Reflexion</button>
  `;
}

function startBackwards() {
  document.getElementById("gameContainer").innerHTML = `
    <p>Gib deine echte Herkunft ein:</p>
    <select id="realHerkunft">
      <option value="Akademiker">Akademikereltern</option>
      <option value="Hauptschule">Hauptschuleltern</option>
      <option value="ohneAbschluss">Eltern ohne Abschluss</option>
    </select>
    <button onclick="zeigeRueckwaertssuche()">Weiter</button>
  `;
}

function zeigeRueckwaertssuche() {
  const herkunft = document.getElementById("realHerkunft") ? 
      document.getElementById("realHerkunft").value : "simuliert";
  let wahrscheinlichkeit = "unbekannt";
  if (herkunft === "Akademiker") wahrscheinlichkeit = "73%";
  if (herkunft === "Hauptschule") wahrscheinlichkeit = "25%";
  if (herkunft === "ohneAbschluss") wahrscheinlichkeit = "7%";

  document.getElementById("gameContainer").innerHTML = `
    <h3>Rückwärtssuche: Wie wahrscheinlich war dein Weg?</h3>
    <p>Basierend auf deiner Herkunft: <strong>${herkunft}</strong></p>
    <p>Wahrscheinlichkeit für akademischen Abschluss: <strong>${wahrscheinlichkeit}</strong></p>
    <p style="margin-top:20px;">Bildung ist nicht nur deine Leistung. Es ist auch System.</p>
    <button onclick="zeigeStart()">Neu starten</button>
  `;
}

zeigeStart();
// Fortsetzung im JS: Berufsauswahl + Biografieauswertung

function zeigeBerufsauswahl(abschluss) {
  let optionen = {
    "Allgemeine Hochschulreife (Abitur)": [
      { beruf: "Lehrer:in", einkommen: 5000 },
      { beruf: "Jurist:in", einkommen: 6500 },
      { beruf: "Mediziner:in", einkommen: 6200 }
    ],
    "Fachhochschulreife (Fachabitur)": [
      { beruf: "Sozialarbeiter:in", einkommen: 3900 },
      { beruf: "Wirtschaftsingenieur:in (FH)", einkommen: 4800 },
      { beruf: "Pflegepädagog:in", einkommen: 4100 }
    ],
    "Berufsabschluss ohne Hochschulreife": [
      { beruf: "Heilerziehungspfleger:in", einkommen: 3300 },
      { beruf: "Elektroniker:in", einkommen: 3600 },
      { beruf: "Verwaltungsfachangestellte:r", einkommen: 3400 }
    ],
    "Hauptschulabschluss oder kein Abschluss": [
      { beruf: "Helfer:in Lager", einkommen: 2300 },
      { beruf: "Reinigungskraft", einkommen: 2100 },
      { beruf: "Produktionshelfer:in", einkommen: 2400 }
    ]
  };

  const auswahl = optionen[abschluss] || [];
  let html = `<h3>Berufsauswahl auf Basis deines Abschlusses:</h3><ul>`;
  auswahl.forEach(opt => {
    html += `<li><strong>${opt.beruf}</strong>: ${opt.einkommen} € brutto</li>`;
  });
  html += `</ul><p>Wähle in deiner Reflexion, welchen Beruf du angenommen hättest.</p>`;
  html += `<button onclick="zeigeRückwärtssuche()">Rückwärtssuche starten</button>`;
  document.getElementById("gameContainer").innerHTML = html;
}

function zeigeRückwärtssuche() {
  document.getElementById("gameContainer").innerHTML = `
    <h3>Rückblick auf deinen echten Bildungsweg</h3>
    <p>Gib ein, wie deine echte Bildungslaufbahn verlief – z. B. Schulform, Abschluss, Beruf.</p>
    <p>Wir vergleichen dann, wie wahrscheinlich dein Weg statistisch war.</p>
    <p><em>(Dieser Teil erscheint später als Eingabeformular.)</em></p>
    <button onclick="zeigeStart()">Spiel neu starten</button>
  `;
}
