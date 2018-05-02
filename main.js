// 4283f11a-0c36-490a-a135-7df8f7c954d4



$(document).ready(function(){

   //Salvo in una variabile l'oggetto input
   var thisInput = $('#search-input');
   resetInput(thisInput);
   var thisInputVal = "";

   //Chiamata AJAX alla pressione del tasto Enter
   $('#search-input').keypress(function(e) {
      //13 = Tasto invio
      if (e.which == 13) {
         thisInputVal = thisInput.val();
         resetInput(thisInput);

         //Cancello i risultati di una eventuale richiesta precedente
         resetList('.film-list', "Film");
         resetList('.series-list', "Serie TV");

         ajaxMoviesCall(thisInputVal);
         ajaxSeriesCall(thisInputVal);
      }
   });





   //Al click del button search recupero il contenuto dell'input
   //e invio una richiesta AJAX alla API TMDb.
   $('#search-btn').click(function(){
      thisInputVal = thisInput.val();
      resetInput(thisInput);

      //Cancello i risultati di una eventuale richiesta precedente
      resetList('.film-list', "Film");
      resetList('.series-list', "Serie TV");

      ajaxMoviesCall(thisInputVal);
      ajaxSeriesCall(thisInputVal);
   });

   

   /* ***** FUNZIONI ***** */

   //Funziona che inoltra la chiamata AJAX. Il parametro ricevuto in ingresso
   //è il valore recuperato dal campo input
   function ajaxMoviesCall(inputVal) {
      $.ajax({
         url : "https://api.themoviedb.org/3/search/movie",
         method : "GET",
         data : {
            api_key : "eb256750e09137c9565156e96a6e8ce1",
            query : inputVal,
            language : "it-IT"
         },
         success : function(data){
            console.log(data);
            var moviesFromAPI = data.results;

            //Solo se il risutato della ricerca ha almeno un elemento verrà
            //stampato a video altrimenti comparirà un avviso di ricerca non
            //andata a buon fine
            if (moviesFromAPI.length > 0) {
               var movies = getMovies(moviesFromAPI);
               console.log(movies);
               showResults(movies);
            } else {
               showNoResults("film-list");
            }
         },
         error : function(e){
            console.log(e);
         },
      });
   }



   //Funzione per il reset dell'input
   function resetInput(inputField) {
      inputField.val('');
   }



});
