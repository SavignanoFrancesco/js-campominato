//Il programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
//Dopodiché, il programma deve chiedere all'utente un numero alla volta e verificare se il numero indicato dall'utente è una mina oppure no.
//Se l'utente becca una mina, il gioco finisce, mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
//Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.


//difficoltà
var difficulty = 0;
//i numeri rnd devono assumere un valore tra min e max
var min = 1;
var max;
//Punteggio
var user_score;

//tre livelli di difficoltà
max = selectDifficulty(difficulty);
console.log('Difficoltà: ' + difficulty);
console.log('Max: ' + max);

//punteggio massimo
var max_score = max - 16;

//array contenente le mine
var bombs = bombsGenerator(min, max);
console.log('Mine: ' + bombs);

//scelta dell'utente
var user_choice;

//inizia il gioco
user_score = playGame(user_choice);
//stampa punteggio
console.log('Punteggio: ' + user_score + '/' + max_score);

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

//fa partire il gioco
function playGame(user_number){
    //se bomb_found diventa true, l'utente ha perso
    var bomb_found = false;
    //numeri che l'utente indovina e che non potra reinserire
    var selected_numbers = [];
    //punteggio
    var score = 0;

    //inizia il gioco
    console.log('GAME STARTED!');

    //ripeti fino a che l'utente non trova una bomba o raggiunge il punteggio massimo
    do {

        //richiesta di un numero all'utente tra min e max(con controllo del valore inserito)
        do {
            user_number = parseInt(prompt('Inserire un numero tra ' + min + ' e ' + max));

            if (user_number < 1 || user_number > 100 || isNaN(user_number)) {
                alert('Inserimento sbagliato..');
            }else if (selected_numbers.includes(user_number)) {
                alert('numero gia inserito!');
            }

        } while (user_number < 1 || user_number > 100 || isNaN(user_number) || (selected_numbers.includes(user_number)));
        console.log('User Number: ' + user_number);

        //se l'utente trova un numero bomba perde
        if(bombs.includes(user_number)){
            bomb_found = true;
            console.log('Mi dispaice hai perso..');
        }
        //altrimenti aumenta il punteggio di uno e aggiunge il numero a quelli che non può reinserire
        else{
            score += 1;
            selected_numbers.push(user_number);
        }

    } while (bomb_found == false && score != (max_score));
    return score;
}
