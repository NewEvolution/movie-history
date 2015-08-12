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
    console.log("retrievedMoviesObj", retrievedMoviesObj);
    console.log("retrievedMoviesArr", retrievedMoviesArr);
    for(var i=0; i<retrievedMoviesArr.length; i++) {
      retrievedMoviesArr[i].actors = retrievedMoviesArr[i].actors.split(", ");
    }
    console.log("mutated retrievedMoviesArr", retrievedMoviesArr);
    $(".main").html(template.movie({Movie:retrievedMoviesArr}));
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

//Add Movie Button    

  $('#addMoviebtn').click(function() {
    console.log("click");
    var addMovie = $("#addMovie").val();
    console.log("addMovie", addMovie);
    movies.getMovie(addMovie, show);
  });

  // Remove Movie Button (Not Firebase)

    $(document).on("click", ".rmv", function() {
    $(this).parent().remove();
    console.log("confirmed remove button working");
  });

//Radio bar for rating the movies

  $("#range").on( "change", ".rating", function(e) {
    console.log("range changed");
    var rating = $(".rating").val();
    console.log(rating);
  });
    
// Toggleclass button for watched/unwatched movies
  $(document).on("click", ".watchToggle", function(e) {
    console.log("confirm classtoggle");
    e.preventDefault();
    $(this).toggleClass("btn-success btn-danger");
  }); 

  $('#search').click(function() {
    console.log("search clicked");
    var searchMovie = $("#search").val();
    console.log(searchMovie);


//ADDED COMMENT BREAK
       
    var filteredMovies = _.filter(searchMovie, function(movie) {
      if (movie.title === filteredMovies) {
        return true;
      } else {
        return false;
      }
    });
   console.log(filteredMovies);
    
  });
     
});














