//VARIABLES

	var twitterKeys = require('./keys.js');
	var Twitter = require('twitter');
	var params = {screen_name: 'coderbing17'};
	var client = new Twitter(
		twitterKeys.twitterKeys
	);

	const SpotifyWebApi = require('spotify-web-api-node');
	var spotifyApi = new SpotifyWebApi();
	// var spotifyKey = require('./keys.js');
	spotifyApi.setAccessToken('spotifyKey');

	var fs = require('fs');
	var request = require('request');

	var input = process.argv;
	var action = input[2];
	var searchTerm = "";

//FUNCTIONS

	function tweets() {
		console.log(twitterKeys.twitterKeys);
		// console.log(spotifyKey)
		// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
	 //   		console.log(tweets);
		// });

	// 	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	//   if (!error) {
	//     console.log(tweets);
	//   }
	//   else {
	//   	console.log(error);
	//   }
	// });

		queryURL = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=coderbing17&count=1';
		client.get(queryURL, function(error, tweets, response) {
			if (!error) {
				console.log(tweets);
			}
			else {
				console.log("Error! " + JSON.stringify(error) );
			}
		})
	}

	function spotify() {
		if (input[3] === undefined) {
			searchTerm = "the sign";
		}
		else {
			searchTerm = input.slice(3, input.length).join(' ');
		}

		// spotifyApi.search({ type: 'track', query: searchTerm }, function(err, data) {
	 //   		if ( err ) {
		//         console.log('Error occurred: ' + err);
		//         return;
  //   		}
  //   		else {
  //   			console.log(data);
  //   		}
		// })

		// spotifyApi.searchTracks(searchTerm)
		// 	.then(function(data) {
  //   			console.log(data.body);
  // 			}, function(err) {
  //   			console.error(err);
  // 			});
	}

	function movie() {
		if (input[3] === undefined) {
			searchTerm = "mr+nobody";
		}
		else {
			searchTerm = input.slice(3, input.length).join(' ');
		}
		movieSearch();
	}

	function movieSearch() {
		var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + searchTerm;

		request(queryUrl, function(err, response, body){
			if ( ! err ){
				if(response.statusCode === 200 ){
					var responseObject = JSON.parse(body);
					console.log("Title: " + responseObject.Title);
					console.log("Release Year: " + responseObject.Year);
					console.log("IMDB Rating: " + responseObject.imdbRating);
					console.log("Country: " + responseObject.Country);
					console.log("Language: " + responseObject.Language);
					console.log("Plot: " + responseObject.Plot);
					console.log("Actors: " + responseObject.Actors);
					searchTerm = searchTerm.split(' ').join('_');
					console.log("Rotten Tomatoes: https://www.rottentomatoes.com/m/" + searchTerm);
				}
			}
			else {
				console.log("Your request failed.");
			}
		});
	}

	function doWhat() {
		fs.readFile('random.txt', 'utf8', function(err, data) {
			if (!err) {
				data = data.split(",");
				action = data[0];
				searchTerm = data[1];
				switch( action ) {
					case "my-tweets":
						tweets();
						break;
					case "spotify-this-song":
						spotify();
						break;
					case "movie-this":
						movieSearch();
						break;
				}
			}
			else {
				console.log("Error! " + err);
			}
		})
	}

//SWITCH OPERATIONS

	switch (action) {
	  case "my-tweets":
	    tweets();
	    break;

	  case "spotify-this-song":
	    spotify();
	    break;

	  case "movie-this":
	    movie();
	    break;

	  case "do-what-it-says":
	    doWhat();
	    break;

	  default: 
	    console.log("Command not found.");
	    break;
	}

