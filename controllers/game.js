const Game = require('../models/game');
const Platform = require('../models/platform');
const Genre = require('../models/genre');
const Publisher = require('../models/publisher');

const { gameShape } = require('../validation');
const compareAndCreate = require('../utils');

exports.getGames = async (req, res) => {
  const listGames = await Game.find()
    .populate('platform')
    .populate('genre')
    .populate('publisher')
    .exec();

  res.render('game', { title: 'Games', listGames });
};

exports.getUpdateGame = async (req, res) => {
  const game = await Game.findById(req.params.id, {})
    .populate('platform')
    .populate('genre')
    .populate('publisher')
    .exec();

  const [allGenres, allPlatforms, allPublishers] = await Promise.all([
    Genre.find().exec(),
    Platform.find().exec(),
    Publisher.find().exec(),
  ]);

  const newAllGenres = compareAndCreate(allGenres, game.genre);
  const newAllPlatforms = compareAndCreate(allPlatforms, game.platform);

  const newAllPublishers = allPublishers.map((publisher) => {
    if (game.publisher._id.toString() === publisher._id.toString()) {
      return { ...publisher.toObject(), checked: true };
    }
    return publisher;
  });

  res.render('gameForm', {
    title: 'Update Game',
    action: 'Update',
    game,
    newAllGenres,
    newAllPlatforms,
    newAllPublishers,
  });
};

exports.updateGame = async (req, res) => {
  req.body.platform = Array.isArray(req.body.platform)
    ? req.body.platform
    : [req.body.platform];

  req.body.genre = Array.isArray(req.body.genre)
    ? req.body.genre
    : [req.body.genre];

  const validation = gameShape.safeParse(req.body);

  if (validation.success) {
    const gameUpdated = await Game.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();
    await gameUpdated.save();
    res.redirect('/inventory/game');
    return;
  } else {
    const game = await Game.findById(req.params.id, {})
      .populate('platform')
      .populate('genre')
      .populate('publisher')
      .exec();

    const [allGenres, allPlatforms, allPublishers] = await Promise.all([
      Genre.find().exec(),
      Platform.find().exec(),
      Publisher.find().exec(),
    ]);

    const newAllGenres = compareAndCreate(allGenres, game.genre);
    const newAllPlatforms = compareAndCreate(allPlatforms, game.platform);

    const newAllPublishers = allPublishers.map((publisher) => {
      if (game.publisher._id.toString() === publisher._id.toString()) {
        return { ...publisher.toObject(), checked: true };
      }
      return publisher;
    });

    res.render('gameForm', {
      title: 'Update Game',
      action: 'Update',
      game: req.body,
      newAllGenres,
      newAllPlatforms,
      newAllPublishers,
      errors: validation.error.errors,
    });
  }
};

exports.getCreateGame = async (req, res) => {
  const [newAllGenres, newAllPlatforms, newAllPublishers] = await Promise.all([
    Genre.find().exec(),
    Platform.find().exec(),
    Publisher.find().exec(),
  ]);

  res.render('gameForm', {
    title: 'Create Game',
    action: 'Create',
    newAllGenres,
    newAllPlatforms,
    newAllPublishers,
  });
};

exports.createGame = async (req, res) => {
  const [newAllGenres, newAllPlatforms, newAllPublishers] = await Promise.all([
    Genre.find().exec(),
    Platform.find().exec(),
    Publisher.find().exec(),
  ]);

  req.body.platform = Array.isArray(req.body.platform)
    ? req.body.platform
    : [req.body.platform];

  req.body.genre = Array.isArray(req.body.genre)
    ? req.body.genre
    : [req.body.genre];

  const validation = gameShape.safeParse(req.body);

  if (validation.success) {
    await new Game(req.body).save();
    res.redirect('/inventory/game');
  } else {
    res.render('gameForm', {
      title: 'Create Game',
      action: 'Create',
      newAllGenres,
      newAllPlatforms,
      newAllPublishers,
      errors: validation.error.errors,
    });
  }
};

exports.getDeleteGame = async (req, res) => {
  res.render('delete', { title: 'Delete Game' });
};

exports.deleteGame = async (req, res) => {
  const _id = req.params.id;
  try {
    await Game.findByIdAndDelete(_id).exec();
    res.redirect('/inventory/game');
  } catch (error) {
    res.render('delete', {
      title: 'Delete Game',
      errors: Array.isArray(error) ? error : [error],
    });
  }
};
