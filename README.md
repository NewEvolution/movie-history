#Movie History

A group project utilizing the OMDb API (http://www.omdbapi.com/) to retrieve movies, add them to a list, provide ratings & a status of watched or unwatched.

Makes use of Firebase https://www.firebase.com/ for data storage.

###Requirements:
- Node.js https://nodejs.org/en/
- Installation of http-server via _npm install -g http-server_

###Post-clone Installation:
- inside the main repo directory:
 - run _bower install_
 - run _npm install_
 - run _http-server_
 - make note of the port number returned after running _http-server_
- navigate to http://localhost:[your-port-number]

Search filters the list of movies, add adds the movie with the provided title to the database.

Watched/Unwatched button toggles between the two states.

Slider provides a rating for the movie.

Delete removes the movie from the database.