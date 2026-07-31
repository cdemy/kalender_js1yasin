var today = new Date();
var d = today.getDate();
var m = today.getMonth()
var y = today.getFullYear();

var dmy = d + "." + m + "." + y;


const heute = new Date();
console.log(heute);

const tag = heute.getDate();
const monat = heute.getMonth() + 1;
const jahr = heute.getFullYear();

console.log(tag + "." + monat + "." + jahr);
const wochentage = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const wochentag = heute.getDay();
console.log(wochentage[wochentag]);