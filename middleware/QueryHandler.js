export const handleURLGetQueries = (req, res, next) => {
  const query = req.query;
  if (!query) return next();
  const queryStrArr = [];
  let queryStr = "";
  const keys = Object.keys(query);
  keys.forEach((key) => {
    queryStrArr.push(key);
  });
  queryStr = queryStrArr.join(", ");
  req.queryStr = queryStr;
  next();
};

export const handleURLUpdateQueries = (req, res, next) => {
  const query = req.query;
  if (!query) return next();
  let queryStr = "";
  const keys = Object.keys(query);
  keys.forEach((key) => {
    queryStr += ` ${key} = "${query[key]}", `;
  });
  req.queryStr = queryStr;
  next();
};
