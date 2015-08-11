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
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies", "templates"], 
  function($, _, _firebase, Handlebars, bootstrap, movies, template){
  var myFirebaseRef = new Firebase("https://movie-history531.firebaseio.com/");
  var retrievedMoviesObj = {};
  var retrievedMoviesArr = [];
  var movie = {};
  var newMovie = {};
  myFirebaseRef.child("Movie").on("value", function(snapshot) {
    retrievedMoviesObj = snapshot.val();
    retrievedMoviesArr = [];
    for(var key in retrievedMoviesObj) {
      retrievedMoviesArr[retrievedMoviesArr.length] = retrievedMoviesObj[key]; // Turn JSON object into array
    }
    var actorArray = [];
    console.log("retrievedMoviesObj", retrievedMoviesObj);
    console.log("actorList", actorList);
    // actorArray = actorList.split(", ");
    // console.log("actorArray", actorArray);
  });
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
      url: "https://movie-history531.firebaseio.com/Movie.json",
       method: "POST", 
       data: JSON.stringify(newMovie)
     }).done(function(NewType) {
       console.log("New Movie");
     });
  
  };
});



