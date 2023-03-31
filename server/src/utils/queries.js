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

const pageQuery = ({ page, pageSize }) => {
  const numPage = page && page >= 1 ? page - 1 : 0;
  const skip = pageSize * numPage;
  return skip;
};

const searchQuery = ({ q, fields }) => {
  let searchQuery = {};

  if (q)
    fields.forEach(
      (field) => (searchQuery[field] = { $regex: q, $options: 'i' })
    );

  return searchQuery;
};

export { sortQuery, pageQuery, searchQuery };
