export const handleURLGetQueries = (req, res, next) => {
  const query = req.query;
  if (!query) return next();
  handleQueryStr(req, query);
  handleQueryConditions(req, query);
  next();
};

const handleQueryStr = (req, query) => {
  let queryStr = "";
  const queryStrArr = [];
  const keys = Object.keys(query);
  keys.forEach((key) => {
    queryStrArr.push(key);
  });
  queryStr = queryStrArr.join(", ");
  req.queryStr = queryStr;
};

const handleQueryConditions = (req, query) => {
  let queryStrConditions = "";
  const queryConditionsArr = [];
  for (const [key, value] of Object.entries(query)) {
    if (value) queryConditionsArr.push(`${key} = '${query[key]}'`);
  }
  queryStrConditions = queryConditionsArr.join(" and ");
  req.queryStrConditions = queryStrConditions;
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
