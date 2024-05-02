const Tour = require('../models/tourModel');

// 2. Route Handlers
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    // results: tours.length,
    // data: { tours },
  });
};

exports.getTour = (req, res) => {
  // const { id } = req.params;
  // const tour = tours.find(({ id: tourId }) => {
  //   return tourId == id;
  // });

  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    statu: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  // const { id } = req.params;
  // const tour = tours.find(({ id: tourId }) => {
  //   return tourId == id;
  // });

  res.status(200).json({
    status: 'succesful',
    data: {
      tour: '<Updated tour here...',
    },
  });
};

exports.deleteTour = (req, res) => {
  // const { id } = req.params;
  // const tour = tours.find(({ id: tourId }) => {
  //   return tourId == id;
  // });

  res.status(204).json({
    status: 'succesful',
    data: null,
  });
};
