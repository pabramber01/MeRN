const sortQuery = ({ sort, fields, defaultSort }) => {
  let sortQuery = {};

  if (sort) {
    sort.split(',').forEach((fieldParam) => {
      if (' ' === fieldParam.slice(0, 1) || '-' !== fieldParam.slice(0, 1))
        fieldParam = `+${fieldParam.trim()}`;
      const order = fieldParam.slice(0, 1);
      const fieldLower = fieldParam.slice(1).toLowerCase();
      const match = fields.find((field) => field.toLowerCase() === fieldLower);
      if (match) sortQuery[match] = Number(`${order}1`);
    });
  }

  if (defaultSort && Object.keys(sortQuery).length === 0) {
    sortQuery = defaultSort;
  }

  return sortQuery;
};

export default sortQuery;
