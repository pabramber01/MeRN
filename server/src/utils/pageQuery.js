const pageQuery = ({ page, pageSize }) => {
  const numPage = page && page >= 1 ? page - 1 : 0;
  const skip = pageSize * numPage;
  return skip;
};

export default pageQuery;
