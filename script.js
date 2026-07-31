var today = new Date();  // Aktuelles Datum
var d = today.getDate(); // Aktueller Tag
var m = today.getMonth() // Aktueller Monat (0-11)
var y = today.getFullYear(); // Aktuelles Jahr

headline.textContent = "Kalenderblatt vom " + d + "." + (m + 1) + "." + y;

const heute = new Date();
console.log(heute);

const tag = heute.getDate();
const monat = heute.getMonth() + 1;
const jahr = heute.getFullYear();

console.log(tag + "." + monat + "." + jahr);
const wochentage = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const wochentag = heute.getDay();
console.log(wochentage[wochentag]);