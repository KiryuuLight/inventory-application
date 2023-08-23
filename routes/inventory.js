const express = require('express');
const router = express.Router();
const {
  getGames,
  getCreateGame,
  getUpdateGame,
  getDeleteGame,
  createGame,
  updateGame,
  deleteGame,
} = require('../controllers/game');
const {
  getGenres,
  getCreateGenre,
  getUpdateGenre,
  getDeleteGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genre');
const {
  getPlatforms,
  getCreatePlatform,
  getUpdatePlatform,
  getDeletePlatform,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require('../controllers/platform');
const {
  getPublishers,
  getCreatePublisher,
  getUpdatePublisher,
  getDeletePublisher,
  createPublisher,
  updatePublisher,
  deletePublisher,
} = require('../controllers/publisher');

router.get('/', (req, res) => {
  res.render('index', { title: 'Inventory Management App...' });
});

/// GAME ROUTES ///

// GET request for creating a game
router.get('/game/create', getCreateGame);

// POST request for creating game
router.post('/game/create', createGame);

// GET request for delete game
router.get('/game/:id/delete', getDeleteGame);

// POST request for delete game
router.post('/game/:id/delete', deleteGame);

// GET request for update game
router.get('/game/:id/update', getUpdateGame);

// POST request for update game
router.post('/game/:id/update', updateGame);

// GET request for request all games
router.get('/game', getGames);

/// GENRE ROUTES ///

router.get('/genre/create', getCreateGenre);

// POST request for creating genre
router.post('/genre/create', createGenre);

// GET request for delete genre
router.get('/genre/:id/delete', getDeleteGenre);

// POST request for delete genre
router.post('/genre/:id/delete', deleteGenre);

// GET request for update genre
router.get('/genre/:id/update', getUpdateGenre);

// POST request for update genre
router.post('/genre/:id/update', updateGenre);

// GET request for request all genres
router.get('/genre', getGenres);

/// PLATFORM ROUTES ///

router.get('/platform/create', getCreatePlatform);

// POST request for creating platform
router.post('/platform/create', createPlatform);

// GET request for delete platform
router.get('/platform/:id/delete', getDeletePlatform);

// POST request for delete platform
router.post('/platform/:id/delete', deletePlatform);

// GET request for update platform
router.get('/platform/:id/update', getUpdatePlatform);

// POST request for update platform
router.post('/platform/:id/update', updatePlatform);

// GET request for request all platforms
router.get('/platform', getPlatforms);

/// PUBLISHER ROUTES ///

router.get('/publisher/create', getCreatePublisher);

// POST request for creating publisher
router.post('/publisher/create', createPublisher);

// GET request for delete publisher
router.get('/publisher/:id/delete', getDeletePublisher);

// POST request for delete publisher
router.post('/publisher/:id/delete', deletePublisher);

// GET request for update publisher
router.get('/publisher/:id/update', getUpdatePublisher);

// POST request for update publisher
router.post('/publisher/:id/update', updatePublisher);

// GET request for request all publishers
router.get('/publisher', getPublishers);

module.exports = router;
