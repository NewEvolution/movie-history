// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

// The main function requiring all our anciliary scripts
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies"], 
  function($, _, _firebase, Handlebars, bootstrap, movies){
    var movie = {};
    var newMovie = {};
    var show = function(showMovie) {
      movie = showMovie;
      console.log("movies", showMovie);
            
      newMovie.title = movie.Title;
      newMovie.year = movie.Year;
      newMovie.actors = movie.Actors;
      newMovie.plot = movie.Plot;
      newMovie.poster = movie.Poster;
      console.log("newMovie", newMovie);

      $.ajax ({
        url: "https://movie-history531.firebaseio.com/Movie",
         method: "POST", 
         data: JSON.stringify(newMovie)
       }).done(function(NewType) {
         console.log("New Movie");
       });
    
    };
    
  //console.log("anything", anything);
  movies.getMovie("cloudy with a chance of meatballs", show);
  



});


// $("#addMovie").click(function() {
//   //console.log("add songclicked");
//   var title = $("#newTitle").val();
//   var year = $("#newYear").val();
//   var actors = $("#newActor").val();
//   var plot = $("#newPlot").val();
  

  
    
//   var newMovie = {};
//   newMovie['title'] = song;
//   newMovie['song.artist'] = artist;
//   newMovie['song.album'] = album;
//   newMovie['song.genre'] = genre;
//   console.log(newMovie);



// $.ajax ({
//         url: "https://movie-history531.firebaseio.com/",
//         method: "POST", 
//         data: JSON.stringify(newSong)
//       }).done(function(NewType) {
//         console.log("New Song");
//       });