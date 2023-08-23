const Publisher = require('../models/publisher');
const { publisherShape } = require('../validation');
const { format, parseISO } = require('date-fns');

exports.getPublishers = async (req, res) => {
  const listPublishers = await Publisher.find().exec();

  console.log(listPublishers);

  res.render('publisher', { title: 'Publishers', listPublishers });
};

exports.getUpdatePublisher = async (req, res) => {
  const _id = req.params.id;
  const publisher = await Publisher.findById(_id).exec();

  res.render('publisherForm', {
    title: 'Update Publisher',
    publisher,
    action: 'Update',
  });
};

exports.updatePublisher = async (req, res) => {
  const _id = req.params.id;
  const validation = publisherShape.safeParse(req.body);

  if (validation.success) {
    await Publisher.findByIdAndUpdate(_id, req.body).exec();
    res.redirect('/inventory/publisher');
    return;
  }

  const { foundingYear, ...publisherInput } = req.body;

  const foundingYearFormat = format(parseISO(foundingYear), 'yyyy-MM-dd');

  const publisher = { ...publisherInput, foundingYearFormat };

  res.render('publisherForm', {
    title: 'Update Publisher',
    publisher,
    action: ' Update',
    errors: validation.error.errors,
  });
};

exports.getCreatePublisher = async (req, res) => {
  res.render('publisherForm', { title: 'Create Publisher', action: 'Create' });
};

exports.createPublisher = async (req, res) => {
  const validation = publisherShape.safeParse(req.body);

  if (validation.success) {
    await new Publisher(req.body).save();
    res.redirect('/inventory/publisher');
    return;
  }

  const { foundingYear, ...publisherInput } = req.body;

  const foundingYearFormat = format(parseISO(foundingYear), 'yyyy-MM-dd');

  const publisher = { ...publisherInput, foundingYearFormat };

  res.render('publisherForm', {
    title: 'Create Publisher',
    publisher,
    action: ' Create',
    errors: validation.error.errors,
  });
};

exports.getDeletePublisher = async (req, res) => {
  res.render('delete', { title: 'Delete Publisher' });
};

exports.deletePublisher = async (req, res) => {
  const _id = req.params.id;

  try {
    await Publisher.findByIdAndDelete(_id).exec();
    res.redirect('/inventory/publisher');
  } catch (error) {
    res.render('delete', {
      title: 'Delete Publisher',
      errors: Array.isArray(error) ? error : [error],
    });
  }
};
