//Il programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
//Dopodiché, il programma deve chiedere all'utente un numero alla volta e verificare se il numero indicato dall'utente è una mina oppure no.
//Se l'utente becca una mina, il gioco finisce, mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
//Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.


//difficoltà
var difficulty = 0;
//i numeri rnd devono assumere un valore tra min e max
var min = 1;
var max;
//se boom_flag diventa true, l'utente ha perso
var boom_flag = false;

//tre livelli di difficoltà
max = selectDifficulty(difficulty);
console.log('Max: ' + max);

//array contenente le mine
var bombs = bombsGenerator(min, max);
console.log('Mine: ' + bombs);

//richiesta di un numero all'utente tra min e max
// do {
//     do {
//         var user_number = parseInt(prompt('Inserire un numero tra ' + min + ' e ' + max));
//
//         if (user_number < 1 || user_number > 100 || isNaN(user_number)) {
//             alert('Inserimento sbagliato..');
//         }
//     } while (user_number < 1 || user_number > 100 || isNaN(user_number));
//     console.log('User Number: ' + user_number);
// } while (boom_flag == false);


//FUNZIONI
//funzione che restituisce il range delle mine generate
function selectDifficulty(int_value){
    var range;
    if(int_value == 0){
        range = 100;
    }else if (int_value == 1) {
        range = 80;
    }else if (int_value = 2) {
        range = 50;
    }
    return range;
}

//funzione che genera un intero random
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//funzione che genera 16 numeri random diversi tra loro, con valore tra min e max
function bombsGenerator(min, max){
    var rnd_numbers = [];
    while(rnd_numbers.length < 16) {
        var rnd_number = getRndInteger(min, max);
        if (!(rnd_numbers.includes(rnd_number))) {
            rnd_numbers.push(rnd_number);
        }
    }
    return rnd_numbers;
}
