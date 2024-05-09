const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

// MiddleWare
exports.aliasTopTours = (req, res, next) => {
  const TOP_TOURS_QUANTITY = '5';
  const TOP_TOURS_SORTING = 'price,-ratingsAverage';
  const TOP_TOURS_FIELDS = 'name,price,averageRatings,summary,difficulty';
  req.query.limit = TOP_TOURS_QUANTITY;
  req.query.sort = TOP_TOURS_SORTING;
  req.query.fields = TOP_TOURS_FIELDS;
  next();
};

// 2. Route Handlers
exports.getAllTours = async (req, res) => {
  try {
    // Create the query
    const query = Tour.find();

    // manipulate the query
    new APIFeatures(query, req.query).filter().sort().limitFields().paginate();
    const tours = await query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      statu: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const tour = await Tour.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'succesful',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: 'succesful',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
