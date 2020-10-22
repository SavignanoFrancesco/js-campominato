//Il programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
//Dopodiché, il programma deve chiedere all'utente un numero alla volta e verificare se il numero indicato dall'utente è una mina oppure no.
//Se l'utente becca una mina, il gioco finisce, mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
//Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.
//BONUS (facoltativo): all'inizio del gioco, il programma chiede all'utente il livello di difficoltà:
//0 = l'intervallo di numeri possibili è tra 1 e 100
//1 = l'intervallo di numeri possibili è tra 1 e 80
//2 = l'intervallo di numeri possibili è tra 1 e 50
//In ogni caso, le mine sono sempre 16.

//numero di bombe
var bomb_quantity = 16;
//i numeri rnd devono assumere un valore tra min e bomb_max_value
var min_number = 1;
var bomb_max_value;
//Punteggio
var user_score;

//ritorna il massimo numero generabile a seconda della difficoltà scelta
bomb_max_value = selectDifficulty();
console.log('Bombs Range: ' + bomb_max_value);

//punteggio massimo = valore massimo generato - quantità di bombe generate
var max_score = bomb_max_value - bomb_quantity;

//restituisce l'array contenente le mine
var bombs = bombsGenerator(min_number, bomb_max_value);
console.log('Mine: ' + bombs);

//inizia il gioco
user_score = playGame(bomb_max_value);
//stampa punteggio
console.log('Punteggio: ' + user_score + '/' + max_score);

//FUNZIONI
//funzione che restituisce il range delle mine generate
function selectDifficulty(){
    var range;
    var int_value;
    do {
        int_value = parseInt(prompt('Seleziona la difficoltà: 0 = Facile ; 1 = Intermedio ; 2 = Difficile'));
            if(int_value == 0){
                range = 100;
                console.log('Modalità Facile');
            }else if (int_value == 1) {
                range = 80;
                console.log('Modalità Intermedia');
            }else if (int_value == 2) {
                console.log('Modalità Difficile');
                range = 50;
            }
            if (int_value < 0 || int_value > 2 || isNaN(int_value)) {
                alert('Inserimento sbagliato..');
            }
    } while (int_value < 0 || int_value > 2 || isNaN(int_value));

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
function playGame(bomb_max_value){

    var user_number;
    //numeri che l'utente indovina e che non potra reinserire
    var selected_numbers = [];
    //se bomb_found diventa true, l'utente ha perso
    var bomb_found = false;
    //punteggio
    var score = 0;

    //inizia il gioco
    console.log('GAME STARTED!');

    //ripeti fino a che l'utente non trova una bomba o raggiunge il punteggio massimo
    do {

        //richiesta di un numero all'utente tra min e max(con controllo del valore inserito)
        do {
            user_number = parseInt(prompt('Inserire un numero tra 1 e ' + bomb_max_value));

            if (user_number < 1 || user_number > bomb_max_value || isNaN(user_number)) {
                alert('Inserimento sbagliato..');
            }else if (selected_numbers.includes(user_number)) {
                alert('numero gia inserito!');
            }

        } while (user_number < 1 || user_number > bomb_max_value || isNaN(user_number) || (selected_numbers.includes(user_number)));
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
    if (score == max_score) {
        console.log('COMPLIMENTI HAI VINTO!!!');
    }
    return score;
}
