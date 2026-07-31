// Das heutige Datum erzeugen
const heute = new Date();

// Tag, Monat und Jahr einzeln auslesen
const tag = heute.getDate();
const monat = heute.getMonth() + 1;
const jahr = heute.getFullYear();

// Tag und Monat immer zweistellig anzeigen
const tagText = String(tag).padStart(2, "0");
const monatText = String(monat).padStart(2, "0");

// Datum zusammensetzen
const datumText = tagText + "." + monatText + "." + jahr;

// Wochentage in einem Array speichern
const wochentage = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag"
];

// getDay() liefert eine Zahl zwischen 0 und 6
const wochentagNummer = heute.getDay();

// Mit der Zahl den passenden Namen aus dem Array holen
const wochentagText = wochentage[wochentagNummer];

// Überschrift auswählen
const headline = document.getElementById("main-headline");

// Überschrift verändern
headline.textContent = "Kalenderblatt vom " + datumText;

// Datum in den Absatz einsetzen
document.getElementById("datum").textContent = datumText;

// Alle Stellen mit class="wochentag" auswählen
const wochentagElemente = document.querySelectorAll(".wochentag");

// Den Wochentag in jede gefundene Stelle einsetzen
wochentagElemente.forEach(function (element) {
  element.textContent = wochentagText;
});

// Kontrolle in der Browser-Konsole
console.log("Datum:", datumText);
console.log("Wochentag:", wochentagText);