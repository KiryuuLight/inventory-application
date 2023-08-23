const Genre = require('../models/genre');
const { genreShape } = require('../validation');

exports.getGenres = async (req, res) => {
  const listGenres = await Genre.find().exec();

  console.log(listGenres);

  res.render('genre', { title: 'Genres', listGenres });
};

exports.getUpdateGenre = async (req, res) => {
  const _id = req.params.id;
  const genreItem = await Genre.findById(_id).exec();

  res.render('genreForm', {
    title: 'Update Genre',
    genre: genreItem,
    action: 'Update',
  });
};

exports.updateGenre = async (req, res) => {
  const _id = req.params.id;

  const genreInput = req.body;

  const validation = genreShape.safeParse(genreInput);

  if (validation.success) {
    await Genre.findByIdAndUpdate(_id, genreInput).exec();
    res.redirect('/inventory/genre');
    return;
  }

  res.render('genreForm', {
    title: 'Update Genre',
    genre: genreInput,
    action: 'Update',
    errors: validation.error.errors,
  });
};

exports.getCreateGenre = (req, res) => {
  res.render('genreForm', { title: 'Create Genre', action: 'Create' });
};

exports.createGenre = async (req, res) => {
  const genreInput = req.body;
  const validation = genreShape.safeParse(genreInput);

  if (validation.success) {
    await new Genre(genreInput).save();
    res.redirect('/inventory/genre');
    return;
  }
  res.render('genreForm', {
    title: 'Create Genre',
    genre: genreInput,
    action: 'Create',
    errors: validation.error.errors,
  });
};

exports.getDeleteGenre = async (req, res) => {
  res.render('delete', { title: 'Delete Genre' });
};

exports.deleteGenre = async (req, res) => {
  const _id = req.params.id;
  try {
    await Genre.findByIdAndDelete(_id).exec();
    res.redirect('/inventory/genre');
  } catch (error) {
    res.render('delete', {
      title: 'Delete Genre',
      errors: Array.isArray(error) ? error : [error],
    });
  }
};
