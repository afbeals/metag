// Internal
import { movies } from '../services/';

export default (app, pool) => {
  app.post('/addMovieToDB', (req, res) =>
    movies
      .addMovieToDB(pool, req)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
  );
  app.delete('/deleteMovie', (req, res) =>
    movies
      .deleteMovie(pool, req)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getAvailableMovies', (req, res) =>
    movies
      .getAvailableMovies(pool, req)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getMovies', (req, res) =>
    movies
      .getMovies(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getMoviesByCategory', (req, res) =>
    movies
      .getMoviesByCategory(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => {
        res.status(500).send(err);
      })
  );

  app.get('/getMoviesByTags', (req, res) =>
    movies
      .getMoviesByTags(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getMovieImg', (req, res) =>
    movies
      .getMovieImg(req)
      .then(results => res.sendFile(results))
      .catch(err => res.status(500).send(err))
  );

  app.get('/streamMovie', (req, res) =>
    movies
      .streamMovie(pool, req)
      .then(({ file, head, status = 206 }) => {
        res.writeHead(status, head);
        file.pipe(res);
      })
      .catch(err => res.status(500).send(err))
  );

  app.get('/searchMovies', (req, res) =>
    movies
      .searchMovies(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => {
        res.status(404).send(err);
      })
  );

  app.post('/updateMovie', (req, res) =>
    movies
      .updateMovie(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => {
        res.status(500).send(err);
      })
  );
};
