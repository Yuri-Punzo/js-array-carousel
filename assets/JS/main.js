/* Consegna:
Dato un array contenente una lista di cinque immagini, creare un carosello come nello screenshot allegato.

MILESTONE 1
Per prima cosa, creiamo il markup statico: costruiamo il container e inseriamo un'immagine grande al centro: avremo così la struttura base e gli stili pronti per poterci poi concentrare solamente sull'aspetto logico.

MILESTONE 2
Adesso rimuoviamo tutto il markup statico e inseriamo tutte le immagini dinamicamente servendoci dell'array fornito e un semplice ciclo for che concatena un template literal. Tutte le immagini saranno nascoste, tranne la prima, che avrà una classe specifica che la renderà visibile. Al termine di questa fase ci ritroveremo con lo stesso slider stilato nella milestone 1, ma costruito dinamicamente attraverso JavaScript.

MILESTONE 3
Al click dell'utente sulle frecce, il programma cambierà l’immagine attiva, che quindi verrà visualizzata al posto della precedente.

BONUS 1:
Aggiungere il ciclo infinito del carosello. Ovvero se è attiva la prima immagine e l'utente clicca la freccia per andare all’immagine precedente, dovrà comparire l’ultima immagine dell’array e viceversa.

BONUS 2:
Aggiungere la visualizzazione di tutte le thumbnails sulla destra dell’immagine grande attiva, come nello screenshot proposto. Tutte le miniature avranno un layer di opacità scura, tranne quella corrispondente all’immagine attiva, che invece avrà un bordo colorato. Al click delle frecce, oltre al cambio di immagine attiva, gestire il cambio di miniatura attiva.
Prima di partire a scrivere codice: Non lasciamoci spaventare dalla complessità apparente dell'esercizio, ma analizziamo prima, come abbiamo fatto sempre, cosa ci potrebbe aspettare. Abbiamo completato ormai da qualche giorno la sessione HTML e CSS, se non ci ricordiamo qualcosa andiamo pure a riguardare alcuni argomenti. Non dedichiamo però al ripasso più di una mezz'ora, così da non perdere di vista il focus dell'esercizio.

Consigli del giorno:
Costruiamo del carosello una versione statica contenente solamente un'immagine.  Di questa versione statica al momento opportuno commenteremo (oscureremo) alcuni elementi per poterli riprodurre dinamicamente in js. Potremo quindi usarli come "template".
Scriviamo sempre prima per punti il nostro algoritmo in italiano per capire cosa vogliamo fare
Al momento giusto (:faccia_pensosa: starà a voi capire quale) rispondete a questa domanda: "Quanti cicli servono?" */


/* creo array con i path delle immagini */
const slidesList = [
    "./assets/img/01 Spiderman - Miles Morales.webp",
    "./assets/img/02 Ratchet & Clank - Rift Apart.webp",
    "./assets/img/03 Fortnite.webp",
    "./assets/img/04 Stray.webp",
    "./assets/img/05 Avengers.webp"
]

/* seleziono dove mettere le immagini */
const slidesElement = document.querySelector(".carousel");

/* getto la base per il mio counter e per poi passare alle imagini successive con ++ */
let visibleImg = 0;

/*  -creo un ciclo for
    -al suo interno creo una var slideslocation che prenda l'url delle img dall'array
    -grazie alla var slidesHtml vado ad assegnare la classe visible usando il metodo if ristretto visto stamani con Fabio
    -con .insertAdjacentHTML di fatto inserisco l'immagine nell'html */
for (let i = 0; i < slidesList.length; i++) {
    const slideLocation = slidesList[i]
    const slidesHtml = `<img class="${i === visibleImg ? 'visible' : ''}" src="${slideLocation}" alt="">`
    slidesElement.insertAdjacentHTML("beforeend", slidesHtml)
}

/* creo due variabile che selezionino i pulsanti per farli poi funzionare */
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

/*  adesso voglio cambiare immagine con il click di next:
    vado a selezionare tutte le immagini con una var allImg
    creo una variabile (currentSlide) per poter selezionare l'img visibile al momento
    (dato che visibleImg è associata a alla i del for selezionerà l'immagine corrente)
    poi gli tolgo la classe visible con classlist.remove facendola sparire
    devo far andare avanti il counter di visibleImg con ++
    (var visibleImg creata prima del ciclo for e che di fatto "tiene il conto" per noi)
    inserito if, leggi sotto perché etcc..
    dopo if creo una var nextImg per l'img a seguire
    assegno alla img a seguire la classe visible per farla apparire */
function nextFunction() {
    const allImg = document.querySelectorAll('.carousel > img');
    const currentSlide = allImg[visibleImg];
    console.log(currentSlide);
    currentSlide.classList.remove("visible");
    visibleImg++;
    /* il problema si creava qua quando dopo l'incremento i numeri di visibleImg andavano fuori dal range dell'array (0-4) con questo if, controllo il numero e lo modifico per farlo ciclare  0 1 2 3 4 0 1 2 3 4 0 1 etcc.  */
    if (visibleImg === slidesList.length) {
        visibleImg = 0;
    }
    const nextImg = allImg[visibleImg];
    console.log(nextImg);
    nextImg.classList.add("visible")
}

/* ora ricopio da sopra ma con -- per fare il previous img */
function prevFunction() {
    const allImg = document.querySelectorAll('.carousel > img');
    const currentSlide = allImg[visibleImg];
    console.log(currentSlide);
    currentSlide.classList.remove("visible");
    visibleImg--;
    /* stessa cosa di sopra ma al rovescio, se il valore scende sotto lo zero lo riportiamo al numero massimale dell'array, ovvero 4*/
    if (visibleImg === -1) {
        visibleImg = 4;
    }
    const prevImg = allImg[visibleImg];
    console.log(prevImg);
    prevImg.classList.add("visible")
}