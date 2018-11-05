//Log der Namen augibt
console.log("Lennard Häring");

//modul readline
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout

});



//Konstante für die Maximale Höhe einer Bewertung für eine App
const maxBewertung = 10;

//Variable ür die Anzahl und die Bewertung
var anzahl = 3;
var bewertung = 4.5;

function bewerten(pBewertung) {
    if(pBewertung>maxBewertung){
        console.log("Wert zu Hoch")
    }
    else {
        anzahl++;
        bewertung = pBewertung;

        console.log("\nAnzahl :" + anzahl);
        console.log("Bewertung :" + bewertung);
    }
}



console.log("\nBewertung mit 6 reingehacked")
bewerten(6);



//Bewertung wird eingelesen
rl.question('\nBewertung ? :', function(answer) {
    //console.log(answer);
    bewerten(answer);
    rl.close();
});

