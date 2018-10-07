//Creating a button click function to change the background
function myFunction() {
    document.body.style.background = " url('6.jpg')";
}

// Getting Gif Data
function getGIFdata(theMovieObj){
	console.log("Get Gif Data");

//getting the data according to the title id in the results of the movie API search
	var gifURL = "https://api.giphy.com/v1/gifs/search?api_key=XnMGe3GMHzxwdIEYSwtWZRNrAV9fMy91&q=";
	var movieTitle = theMovieObj.title;
	var searchGif= gifURL + movieTitle;

	$.ajax({
	      url: searchGif,
	      type: 'GET',
	      dataType: 'json',
	      error: function(err){
	        console.log("Nooo");
	        console.log(err);
	    },
	    success:function(data){
	      console.log("Search gif!");
	      console.log(data);

	        var embedURL = data.data[0].embed_url; 
	        console.log(embedURL);

	     
	      var iFrame = '<iframe src="'+ embedURL + '" width="400" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
	        $('#imageresult').append(iFrame);
	    }}
    );
}

//Getting Movie API data

function getMovieData(inputValue){
	console.log("Getting Movie DB Data");
	var movieURL = "https://api.themoviedb.org/3/search/movie?api_key=534eba42a6966339288ebfaa060f2883&query='";
    var searchMovieURL = movieURL + inputValue;
    $.ajax({
		url: searchMovieURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log(err);
		},
		success: function(data){
			console.log("Got the data");
			console.log(data);
			var theMovieResults = data.results;
			console.log(theMovieResults);

			//Clear out the container
			$('#result').html("");

			//loop through all of the movie objects and request gifs for each one
			for (var i = 0; i < theMovieResults.length; i++){
				getGIFdata(theMovieResults[i]);
			}
		}
	});

}

$(document).ready(function(){
console.log("Ready to go2");

  $("#theButton").click(function(){
    console.log("The button was pressed!");

    var theInput = $('#theInput').val();
      console.log(theInput);

      $('#imageresult').empty();

      $('#result').empty();
      //searching upon click 
      getMovieData(theInput);
      
  });
});

console.log("Finished loading.");
