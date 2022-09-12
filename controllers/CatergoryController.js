import db from "../database/db.js";

export const checkCategoryExistenceById = async (req, res, next) => {
  const info = {
    id: req.params.id,
  };
  if (!info.id)
    return res.status(400).json({ message: "Error 400 - Missing parameter" });
  await db
    .promise()
    .execute("SELECT id FROM category where id = ? and deleted_at IS NULL", [
      info.id,
    ])
    .then(([rows]) => {
      if (rows.length === 0) {
        req.categoryExist = false;
        next();
      } else {
        req.categoryExist = true;
        next();
      }
    })
    .catch(() => {
      req.categoryExist = false;
      next();
    }); // Error 500 - Internal error
};

export const checkCategoryExistenceByName = async (req, res, next) => {
  const info = {
    name: req.body.name,
  };
  if (!info.name)
    return res.status(400).json({ message: "Error 400 - Missing parameter" });
  await db
    .promise()
    .execute("SELECT id FROM category where name = ? and deleted_at IS NULL", [
      info.name,
    ])
    .then(([rows]) => {
      if (rows.length === 0) {
        req.categoryExist = false;
        next();
      } else {
        req.categoryExist = true;
        next();
      }
    })
    .catch(() => {
      req.categoryExist = false;
      next();
    });
};

export const getCategories = async (req, res) => {
  const categoryObj = {};
  const queryStr = req.queryStr;
  await db
    .promise()
    .execute(
      `SELECT ${queryStr || "id, name"} FROM category where deleted_at IS NULL`
    )
    .then(([rows, fields]) => {
      categoryObj.categories = rows;
      res.json(categoryObj);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};

export const getCategoryById = async (req, res) => {
  const categoryObj = {};
  await db
    .promise()
    .execute(
      "SELECT id, name FROM category where id = ? and deleted_at IS NULL",
      [req.params.id]
    )
    .then(([rows, fields]) => {
      if (rows.length === 0)
        return res
          .status(404)
          .json({ message: "Error 404 - Category not found" });
      categoryObj.category = rows[0];
      res.json(categoryObj);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};

export const createCategory = async (req, res) => {
  const categoryExist = req.categoryExist;
  if (categoryExist)
    return res.status(409).json({ message: "Error 409 - Conflict" });
  const info = {
    name: req.body.name,
    created_at: new Date(),
  };
  if (!info.name) {
    return res.status(400).json({ message: "Error 400 - Missing parameter" });
  }
  await db
    .promise()
    .execute("INSERT INTO category (name,created_at) VALUES (?,?)", [
      info.name,
      info.created_at,
    ])
    .then(([rows, fields]) => {
      res.status(200).json({ message: "Category created successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};

export const updateCategory = async (req, res) => {
  const categoryExist = req.categoryExist;
  if (!categoryExist)
    return res.status(404).json({ message: "Error 404 - Category not found" });
  const queryStr = req.queryStr;
  if (!queryStr)
    return res.status(400).json({ message: "Error 400 - Bad request" });
  const info = {
    id: req.params.id,
    updated_at: new Date(),
  };

  await db
    .promise()
    .execute(`UPDATE category SET ${queryStr} updated_at = ? WHERE id = ?`, [
      info.updated_at,
      info.id,
    ])
    .then(([rows, fields]) => {
      res.status(200).json({ message: "Category updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};

export const deleteCategory = async (req, res) => {
  const categoryExist = req.categoryExist;
  if (!categoryExist)
    return res.status(404).json({ message: "Error 404 - Category not found" });
  const info = {
    id: req.params.id,
    deleted_at: new Date(),
  };
  await db
    .promise()
    .execute("UPDATE category SET deleted_at = ? WHERE id = ?", [
      info.deleted_at,
      info.id,
    ])
    .then(([rows, fields]) => {
      res.status(200).json({ message: "Category deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};
