const Platform = require('../models/platform');
const { platformShape } = require('../validation');
const { format, parseISO } = require('date-fns');

exports.getPlatforms = async (req, res) => {
  const listPlatforms = await Platform.find().exec();

  console.log(listPlatforms);

  res.render('platform', { title: 'Platforms', listPlatforms });
};

exports.getUpdatePlatform = async (req, res) => {
  const _id = req.params.id;
  const platformItem = await Platform.findById(_id).exec();

  res.render('platformForm', {
    title: 'Update Platform',
    platform: platformItem,
    action: 'Update',
  });
};

exports.updatePlatform = async (req, res) => {
  const _id = req.params.id;

  const validation = platformShape.safeParse(req.body);

  if (validation.success) {
    await Platform.findByIdAndUpdate(_id, req.body).exec();
    res.redirect('/inventory/platform');
    return;
  }
  // Otherwise

  const { releaseYear, ...platformInput } = req.body;

  const releaseYearFormat = format(parseISO(releaseYear), 'yyyy-MM-dd');

  const platform = { ...platformInput, releaseYearFormat };

  res.render('platformForm', {
    title: 'Update Platform',
    platform,
    action: 'Update',
    errors: validation.error.errors,
  });
};

exports.getCreatePlatform = (req, res) => {
  res.render('platformForm', { title: 'Create Platform', action: 'Create' });
};

exports.createPlatform = async (req, res) => {
  const validation = platformShape.safeParse(req.body);

  if (validation.success) {
    await new Platform(req.body).save();
    res.redirect('/inventory/Platform');
    return;
  }

  // Otherwise

  const { releaseYear, ...platformInput } = req.body;

  const releaseYearFormat = format(parseISO(releaseYear), 'yyyy-MM-dd');

  const platform = { ...platformInput, releaseYearFormat };

  res.render('platformForm', {
    title: 'Create Platform',
    platform,
    action: 'Create',
    errors: validation.error.errors,
  });
};

exports.getDeletePlatform = async (req, res) => {
  res.render('delete', { title: 'Delete Platform' });
};

exports.deletePlatform = async (req, res) => {
  const _id = req.params.id;
  try {
    await Platform.findByIdAndDelete(_id).exec();
    res.redirect('/inventory/platform');
  } catch (error) {
    res.render('delete', {
      title: 'Delete Platform',
      errors: Array.isArray(error) ? error : [error],
    });
  }
};
