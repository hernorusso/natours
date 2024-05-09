class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Replace mongo operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    this.query.find(queryObj);
    return this;
  }

  sort() {
    let { sort } = this.queryString;
    if (sort) {
      sort = sort.split(',').join(' ');
      this.query.sort(sort);
    } else {
      this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    let { fields } = this.queryString;
    if (fields) {
      fields = fields.split(',').join(' ');
      this.query.select(fields);
    } else {
      this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const { page, limit = 10 } = this.queryString;
    const pageSize = limit * 1;
    const pageNum = page * 1 || 1;
    const skip = (pageNum - 1) * pageSize;
    this.query.skip(skip).limit(pageSize);

    return this;
  }
}

module.exports = APIFeatures;
