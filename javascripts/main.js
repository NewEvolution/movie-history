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
  var movie = {};
  var newMovie = {};
  myFirebaseRef.child("Movie").on("value", function(snapshot) {
    retrievedMoviesObj = snapshot.val();
    actorArrayMoviesObj = snapshot.val();
    for(var key in actorArrayMoviesObj) {
      actorArrayMoviesObj[key].actors = actorArrayMoviesObj[key].actors.split(", ");
    }
    $(".main").html(template.movie({Movie:actorArrayMoviesObj}));
    var allMovies = $(".movie-sec");
    for(var i=0; i<allMovies.length; i++) {
      var thisMovieKey = $(allMovies[i]).attr("key");
      console.log("thisMovieKey", thisMovieKey);
      var isWatched = retrievedMoviesObj[thisMovieKey].watched;
      console.log("isWatched", isWatched);
      var $thisMovieWatchButton = $(allMovies[i]).find(".watchToggle");
      console.log("$thisMovieWatchButton", $thisMovieWatchButton);
      if(isWatched) {
        $thisMovieWatchButton.html("Watched");
        $thisMovieWatchButton.removeClass("btn-danger");
        $thisMovieWatchButton.addClass("btn-success");
      } else {
        $thisMovieWatchButton.html("Unwatched");
        $thisMovieWatchButton.removeClass("btn-success");
        $thisMovieWatchButton.addClass("btn-danger");
      }
    }
  });
  var show = function(showMovie) {
    movie = showMovie;
    console.log("movies", showMovie);
          
    newMovie.title = movie.Title;
    newMovie.year = movie.Year;
    newMovie.actors = movie.Actors;
    newMovie.plot = movie.Plot;
    newMovie.poster = movie.Poster;
    newMovie.rating = 5;
    newMovie.watched = false;
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
    $("#addMovie").val("");
    movies.getMovie(addMovie, show);
  });

  // Remove Movie Button (Not Firebase)

    $(document).on("click", ".rmv", function() {
    $(this).parent().remove();
    console.log("confirmed remove button working");
  });

//Radio bar for rating the movies

  $("#range").on( "change", ".rating", function(e) {
    var movieKey = $(this).parents(".movie-sec").attr("key");
    var movieWithNewRating = retrievedMoviesObj[movieKey];
    movieWithNewRating.rating = $(this).val();
    myFirebaseRef.child("Movie").child(movieKey).set(movieWithNewRating);
  });
    
  $('#search').click(function() {
    console.log("search clicked");
    console.log("retrievedMoviesObj before", retrievedMoviesObj);
    // var movieArray = [];

    // for (var key in retrievedMoviesObj) {
    //   movieArray[movieArray.length] = retrievedMoviesObj[key];
    // }   
    // console.log("movie array", movieArray);
    
    // var searchMovie = $("#search").val().split(movie);
    // console.log("search Move", searchMovie);
    
    var filteredMovies = [];     
    filteredMovies = _.result(_.find(retrievedMoviesObj));
    //  return _.matches;
     
      
      // if (retrievedMoviesObj.title === filteredMovies) {
      //   return true;
      // } else {
      //   return false;
    
      // }

    console.log("filter", filteredMovies);
  });

// Toggleclass button for watched/unwatched movies
  $(document).on("click", ".watchToggle", function(e) {
    e.preventDefault();
    var movieKey = $(this).parents(".movie-sec").attr("key");
    var movieWithNewWatched = retrievedMoviesObj[movieKey];
    if(movieWithNewWatched.watched) {
      movieWithNewWatched.watched = false;
    } else {
      movieWithNewWatched.watched = true;
    }
    myFirebaseRef.child("Movie").child(movieKey).set(movieWithNewWatched);
  }); 
    
     
});














