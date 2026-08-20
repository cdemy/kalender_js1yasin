// 1. Aktuelles Datum erzeugen
const heute = new Date();

// Der Tag, auf den sich Infotext, Überschrift und API beziehen
let ausgewaehltesDatum = new Date(heute);

// Der Monat, der aktuell im Kalender angezeigt wird
let angezeigterMonat = new Date(
    heute.getFullYear(),
    heute.getMonth(),
    1
);
const tag = heute.getDate();
const monatIndex = monatsnamen[monatIndex];
const jahr = heute.getFullYear();

// --------------------------------------------------
// 1.1 Feiertage API
function formatiereDatumISO(datum) {
  const jahr = datum.getFullYear();

  const monat = String(
    datum.getMonth() + 1
  ).padStart(2, "0");

  const tag = String(
    datum.getDate()
  ).padStart(2, "0");

  return `${jahr}-${monat}-${tag}`;
}
// 1.2 Historical Events API 
//---------------------------------------------------


async function ladeHistorischeEreignisse() {
   const tag = ausgewaehltesDatum.getDate();

   const apiMonat = ausgewaehltesDatum.getMonth() + 1;

   const monatIndex = ausgewaehltesDatum.getMonth();
   const monatsname = monatsname[monatsIndex];

   const historyUrl =  `https://history.muffinlabs.com/date/${apiMonat}/${tag}`;
   
   try { 
    const antwort = await fetch(historyUrl);
    const daten = await antwort.json();
    console.log("History API:", daten);
    const historyTitle = document.getElementById("history-title");
    const historyList = document.getElementById("history-list");
    historyTitle.textContent = `Historische Ereignisse am ${tag}. ${monatsname}`;
    }
    catch (fehler) {
      console.error("History API Fehler:", fehler);
} }

// --------------------------------------------------
// 2. Hintergrund über JavaScript setzen
// --------------------------------------------------

document.documentElement.style.setProperty(
  "--seiten-hintergrund",
  'url("assets/background_kalender_naser.png")'
);


// --------------------------------------------------
// 3. Datum formatieren
// --------------------------------------------------

const tagText = String(tag).padStart(2, "0");
const monatText = String(monatIndex + 1).padStart(2, "0");

const datumText = `${tagText}.${monatText}.${jahr}`;


// --------------------------------------------------
// 4. Wochentag und Monatsnamen bestimmen
// --------------------------------------------------

const wochentage = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag"
];

const monatsnamen = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
];

const wochentagText = wochentage[heute.getDay()];
const monatsname = monatsnamen[monatIndex];


// --------------------------------------------------
// 5. Bestimmen, der wievielte Wochentag es im Monat ist
// Beispiel: erster Montag, zweiter Montag usw.
// --------------------------------------------------

const vorkommenImMonat = Math.ceil(tag / 7);

const reihenfolgen = [
  "erste",
  "zweite",
  "dritte",
  "vierte",
  "fünfte"
];

const reihenfolgeText =
  reihenfolgen[vorkommenImMonat - 1];


// --------------------------------------------------
// 6. Tag des Jahres berechnen
// UTC verhindert Probleme durch Zeitumstellungen
// --------------------------------------------------

const heuteUTC = Date.UTC(jahr, monatIndex, tag);
const jahresanfangUTC = Date.UTC(jahr, 0, 0);

const tagDesJahres = Math.floor(
  (heuteUTC - jahresanfangUTC) / 86400000
);
// daysInMonths = [ 31, 28, 31, 30, 31, 30 , ... ];
// if (((month + 1) % 7) % 2 == 0) {
//   if (month == 1 && isLeapYear()) { 29 } else if (month == 1) { 28} else { 30 }
// } else {
//   31
// } 

// --------------------------------------------------
// 7. Anzahl der Tage im Jahr und Resttage berechnen
// --------------------------------------------------

const tageImJahr =
  (Date.UTC(jahr + 1, 0, 0) - Date.UTC(jahr, 0, 0))
  / 86400000;

const verbleibendeTage = tageImJahr - tagDesJahres;


// --------------------------------------------------
// 8. Tage im aktuellen Monat berechnen
// Tag 0 des nächsten Monats = letzter Tag dieses Monats
// --------------------------------------------------

const tageImMonat = new Date(
  jahr,
  monatIndex + 1,
  0
).getDate();


// --------------------------------------------------
// 9. Überschrift und Beschreibung einsetzen
// --------------------------------------------------

const hauptUeberschrift =
  document.getElementById("main-headline");

const tagesbeschreibung =
  document.getElementById("tagesbeschreibung");

const monatsUeberschrift =
  document.getElementById("monats-ueberschrift");

hauptUeberschrift.textContent =
  `Kalenderblatt vom ${datumText}`;

monatsUeberschrift.textContent =
  `${monatsname} ${jahr}`;

// ---------------------------------
// function feiertage

  function zeigeTagesbeschreibung(feiertagsText) {
  tagesbeschreibung.textContent =
    `Der ${datumText} ist ein ${wochentagText} und zwar der ` +
    `${reihenfolgeText} ${wochentagText} im Monat ${monatsname} ` +
    `des Jahres ${jahr}. Es handelt sich um den ${tagDesJahres}. ` +
    `Tag des Jahres. Bis zum Jahresende verbleiben noch ` +
    `${verbleibendeTage} Tage. Der Monat ${monatsname} hat ` +
    `insgesamt ${tageImMonat} Tage. ${feiertagsText}`;
}

async function pruefeFeiertag() {
  const bundesland = "HE";
  const heutigesDatumISO = formatiereDatumISO(heute);

  const apiUrl =
    `https://feiertage-api.de/api/?jahr=${jahr}` +
    `&nur_land=${bundesland}`;

  try {
    const antwort = await fetch(apiUrl);

    if (!antwort.ok) {
      throw new Error(
        `HTTP-Fehler: ${antwort.status}`
      );
    }

    const feiertage = await antwort.json();
          markiereFeiertageImKalender(feiertage);
    const gefundenerFeiertag =
      Object.entries(feiertage).find(
        ([feiertagsName, feiertagsDaten]) => {
          return (
            feiertagsDaten.datum ===
            heutigesDatumISO
          );
        }
      );

    if (gefundenerFeiertag) {
      const [feiertagsName] =
        gefundenerFeiertag;

      return (
        `Heute ist in Hessen der gesetzliche Feiertag ` +
        `„${feiertagsName}“.`
      );
    }

    return (
      "Heute ist in Hessen kein gesetzlicher Feiertag."
    );
  } catch (fehler) {
    console.error(
      "Feiertagsprüfung fehlgeschlagen:",
      fehler
    );

    return (
      "Die automatische Feiertagsprüfung konnte " +
      "momentan nicht geladen werden."
    );
  }
}

  zeigeTagesbeschreibung(
    "Die Feiertagsprüfung wird geladen."
);

  pruefeFeiertag().then((feiertagsText) => {
    zeigeTagesbeschreibung(feiertagsText);
});

// --------------------------------------------------
// 10. Kalender des aktuellen Monats erzeugen
// --------------------------------------------------

const kalenderInhalt =
  document.getElementById("kalender-inhalt");

// Vorhandene Inhalte entfernen
kalenderInhalt.textContent = "";

// getDay():
// 0 = Sonntag
// 1 = Montag
//
// Für unseren Kalender soll Montag Position 0 sein.
const ersterTagDesMonats =
  new Date(jahr, monatIndex, 1).getDay();

const startPosition =
  (ersterTagDesMonats + 6) % 7;

let zeile = document.createElement("tr");


// --------------------------------------------------
// 11. Leere Felder vor dem ersten Monatstag
// --------------------------------------------------

for (let i = 0; i < startPosition; i++) {
  const leeresFeld = document.createElement("td");

  leeresFeld.classList.add("leer");
  zeile.appendChild(leeresFeld);
}


// --------------------------------------------------
// 12. Tage des Monats eintragen
// --------------------------------------------------

for (
  let kalenderTag = 1;
  kalenderTag <= tageImMonat;
  kalenderTag++
) {
  const feld = document.createElement("td");

  feld.textContent = kalenderTag;

  const datumDesFeldes =
    new Date(jahr, monatIndex, kalenderTag);

  const isoDatumDesFeldes =
  formatiereDatumISO(datumDesFeldes);

  feld.dataset.datum = isoDatumDesFeldes;

  const wochentagDesFeldes =
    datumDesFeldes.getDay();

  // Samstag
  if (wochentagDesFeldes === 6) {
    feld.classList.add("samstag");
  }

  // Sonntag
  if (wochentagDesFeldes === 0) {
    feld.classList.add("sonntag");
  }

  // Aktuellen Tag markieren
  if (kalenderTag === tag) {
    feld.classList.add("heute");
    feld.setAttribute("aria-current", "date");
  }

  zeile.appendChild(feld);

  // Nach sieben Feldern ist eine Woche vollständig
  if (zeile.children.length === 7) {
    kalenderInhalt.appendChild(zeile);
    zeile = document.createElement("tr");
  }
}


// --------------------------------------------------
// 13. Letzte Woche mit leeren Feldern auffüllen
// --------------------------------------------------

if (zeile.children.length > 0) {
  while (zeile.children.length < 7) {
    const leeresFeld = document.createElement("td");

    leeresFeld.classList.add("leer");
    zeile.appendChild(leeresFeld);
  }

  kalenderInhalt.appendChild(zeile);
}

function markiereFeiertageImKalender(feiertage) {
  Object.entries(feiertage).forEach(
    ([feiertagsName, feiertagsDaten]) => {
      const feiertagsFeld = document.querySelector(
        `[data-datum="${feiertagsDaten.datum}"]`
      );

      if (feiertagsFeld) {
        feiertagsFeld.classList.add("feiertag");
        feiertagsFeld.title = feiertagsName;
      }
    }
  );
}

// ------------------------------
// 1.2.1

ladeHistorischeEreignisse();
// --------------------------------------------------
// 14. Kontrolle in der Browser-Konsole
// --------------------------------------------------

console.log("Aktuelles Datum:", datumText);
console.log("Wochentag:", wochentagText);
console.log("Monat:", monatsname);
console.log("Tag des Jahres:", tagDesJahres);
console.log("Restliche Tage:", verbleibendeTage);