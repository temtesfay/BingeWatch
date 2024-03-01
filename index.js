
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});




app.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=28b2d2b884aafdcb1ad636064a64279c&query=${query}`);
      const movies = response.data.results;
      res.render('results', { movies }); // Render the 'results.ejs' page with movies data
  } catch (error) {
      console.error('Error fetching data from API:', error);
      res.status(500).send('Error fetching data from API');
  }
});

app.get('/movie/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=28b2d2b884aafdcb1ad636064a64279c`);
      const movie = response.data;
      res.render('movie_details', { movie }); // Render the 'movie_details.ejs' page with movie data
  } catch (error) {
      console.error('Error fetching movie details from API:', error);
      res.status(500).send('Error fetching movie details from API');
  }
});






// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
