var today = new Date();
var d = today.getDate();
var m = today.getMonth()
var y = today.getFullYear();

var dmy = d + "." + m + "." + y;


let headline = document.getElementById("main-headline");
headline.textContent = "Neuer, cooler Titel!";