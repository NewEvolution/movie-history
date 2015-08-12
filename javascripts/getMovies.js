define(["jquery"], function($) {

  return {
    getMovie: function(title, callback) {
      
    
      $.ajax({
          url: "http://www.omdbapi.com/?t="+title+"&y=&plot=short&r=json",        
        }).done(function(data) {
          
          
          //console.log("data", data);
          callback(data);
          
      });

    }

  };

  // $(document).on("click", "#rmv", function() {
  //   $(this).parent().remove();
  //   console.log("CLICKED MOTHERFUCKER")
  });

});

