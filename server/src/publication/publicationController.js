import { Publication } from './index.js';
import { StatusCodes } from 'http-status-codes';

const getAllPublications = async (req, res) => {
  const { sort, page } = req.query;

  let sortQuery = {};
  if (sort) {
    sort.split(',').forEach((field) => {
      if ('' === field.slice(0, 1)) field = `+${field}`;
      const order = field.slice(0, 1);
      switch (field.slice(1).toLowerCase()) {
        case 'createdat':
          sortFields['createdAt'] = Number(`${order}1`);
          break;
        case 'updatedat':
          sortFields['updatedAt'] = Number(`${order}1`);
          break;
      }
    });
  }
  if (Object.keys(sortQuery).length === 0) sortQuery = { updatedAt: -1 };

  const numPage = page && page >= 1 ? page - 1 : 0;
  const pageSize = 9;
  const skipQuery = pageSize * numPage;

  const data = await Publication.find(
    {},
    { title: 1, images: { $slice: 1 }, user: 1 },
    { sort: sortQuery, limit: pageSize, skip: skipQuery }
  ).populate('user', 'username avatar');

  res.status(StatusCodes.OK).json({ success: true, data });
};

export default { getAllPublications };
