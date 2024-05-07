const Tour = require('../models/tourModel');

// 2. Route Handlers
exports.getAllTours = async (req, res) => {
  try {
    // build the query object
    // 1) Filtering
    let queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Replace mongo operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    let query = Tour.find(queryObj);

    // 2) Sorting
    let { sort: sortBy } = req.query;
    if (sortBy) {
      sortBy = sortBy.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query.sort('-createdAt');
    }

    // 3) Field limiting
    let { fields } = req.query;
    if (fields) {
      fields = fields.split(',').join(' ');
      query.select(fields);
    } else {
      query.select('-__v');
    }

    // Pagination
    const { page, limit = 10 } = req.query;
    const pageSize = limit * 1;
    const pageNum = page * 1 || 1;
    const skip = (pageNum - 1) * pageSize;
    query.skip(skip).limit(pageSize);
    // execute the query
    if (page) {
      const toursNum = await Tour.countDocuments();
      if (toursNum <= skip)
        throw new Error('The page you request does not exist');
    }
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
