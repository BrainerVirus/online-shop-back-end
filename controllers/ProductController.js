import db from "../db/db.js";

export const checkProductExistenceById = async (req, res, next) => {
  const info = {
    id: req.params.id,
  };
  if (!info.id)
    return res.status(400).json({ message: "Error 400 - Missing parameter" });
  await db
    .promise()
    .execute("SELECT id FROM product where id = ? and deleted_at IS NULL", [
      info.id,
    ])
    .then(([rows]) => {
      if (rows.length === 0) {
        req.ProductExist = false;
        next();
      } else {
        req.ProductExist = true;
        next();
      }
    })
    .catch(() => {
      req.ProductExist = false;
      next();
    }); // Error 500 - Internal error
};

export const checkProductExistenceByName = async (req, res, next) => {
  const info = {
    name: req.body.name,
  };
  if (!info.name)
    return res.status(400).json({ message: "Error 400 - Missing parameter" });
  await db
    .promise()
    .execute("SELECT name FROM product where name = ? and deleted_at IS NULL", [
      info.name,
    ])
    .then(([rows]) => {
      if (rows.length === 0) {
        req.ProductExist = false;
        next();
      } else {
        req.ProductExist = true;
        next();
      }
    })
    .catch(() => {
      req.ProductExist = false;
      next();
    });
};

export const getProducts = async (req, res) => {
  const productObj = {};
  const queryStr = req.queryStr;
  await db
    .promise()
    .execute(
      `SELECT ${
        queryStr || "id, name, url_image, price, discount, category"
      } FROM product where deleted_at IS NULL`
    )
    .then(([rows, fields]) => {
      productObj.products = rows;
      res.json(productObj);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};

export const getProductById = async (req, res) => {
  const productObj = {};
  await db
    .promise()
    .execute(
      "SELECT id, name, url_image, price, discount, category FROM product where id = ? and deleted_at IS NULL",
      [req.params.id]
    )
    .then(([rows, fields]) => {
      if (rows.length === 0)
        return res
          .status(404)
          .json({ message: "Error 404 - Product not found" });
      productObj.product = rows[0];
      res.json(productObj);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};

export const createProduct = async (req, res) => {
  const ProductExist = req.ProductExist;
  console.log("ProductExist", ProductExist);
  if (ProductExist)
    return res.status(409).json({ message: "Error 409 - Conflict" });
  const info = {
    name: req.body.name,
    url_image: req.body.url_image,
    price: req.body.price,
    discount: req.body.discount,
    category: req.body.category,
    created_at: new Date(),
  };
  if (
    !info.name ||
    !info.price ||
    !info.category ||
    !info.url_image ||
    !info.discount
  ) {
    return res.status(400).json({ message: "Error 400 - Missing parameter" });
  }
  await db
    .promise()
    .execute(
      "INSERT INTO product (name, url_image, price, discount, category, created_at) VALUES (?,?, ?, ?, ?, ?)",
      [
        info.name,
        info.url_image,
        info.price,
        info.discount,
        info.category,
        info.created_at,
      ]
    )
    .then(([rows, fields]) => {
      res.status(200).json({ message: "Product created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};

export const updateProduct = async (req, res) => {
  const ProductExist = req.ProductExist;
  console.log("ProductExist", ProductExist);
  if (!ProductExist)
    return res.status(404).json({ message: "Error 404 - Product not found" });
  const queryStr = req.queryStr;
  if (!queryStr)
    return res.status(400).json({ message: "Error 400 - Bad request" });
  const info = {
    id: req.params.id,
    updated_at: new Date(),
  };
  await db
    .promise()
    .execute(`UPDATE product SET ${queryStr} updated_at = ? WHERE id = ?`, [
      info.updated_at,
      info.id,
    ])
    .then(([rows, fields]) => {
      res.status(200).json({ message: "Product updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};

export const deleteProduct = async (req, res) => {
  const ProductExist = req.ProductExist;
  if (!ProductExist)
    return res.status(404).json({ message: "Error 404 - Product not found" });
  const info = {
    id: req.params.id,
    deleted_at: new Date(),
  };
  await db
    .promise()
    .execute("UPDATE product SET deleted_at = ? WHERE id = ?", [
      info.deleted_at,
      info.id,
    ])
    .then(([rows, fields]) => {
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error 500 - Internal error" });
    });
};
