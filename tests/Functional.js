import server from "../server.js";
import chaiHttp from "chai-http";
import chai from "chai";
const assert = chai.assert;

chai.use(chaiHttp);

suite("#Functional tests", function () {
  suite("#Testing CRUD operations in /categories API enpoint", function () {
    suite("Testing POST /categories/create", function () {
      test("Create a new category with every filed", function (done) {
        chai
          .request(server)
          .post("/categories/create")
          .send({ name: "Testing Category" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, "Category created successfully");
            done();
          });
      });
      test('Create a new category with missing "name" field', function (done) {
        chai
          .request(server)
          .post("/categories/create")
          .send({ name: "" })
          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body.message, "Error 400 - Missing parameter");
            done();
          });
      });
    });
    suite("Testing GET /categories/", function () {
      test("Get all categories", function (done) {
        chai
          .request(server)
          .get("/categories")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body.categories);
            done();
          });
      });
      test("Get all categories with query string", function (done) {
        chai
          .request(server)
          .get("/categories/?id&name")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body.categories);
            assert.property(res.body.categories[0], "id");
            assert.property(res.body.categories[0], "name");
            done();
          });
      });
    });
    test("Get category by id", function (done) {
      chai
        .request(server)
        .get("/categories/1")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body.category, "id");
          assert.property(res.body.category, "name");
          done();
        });
      test("Get categories with wrong query string", function (done) {
        chai
          .request(server)
          .get("/categories/?id&name&invalid")
          .end(function (err, res) {
            assert.equal(res.status, 500);
            assert.equal(res.body.message, "Error 500 - Internal error");
            done();
          });
      });
    });
    suite("Testing PUT /categories/update/:id", function () {
      test("Update a category with query string", function (done) {
        chai
          .request(server)
          .put("/categories/update/4?name=testing")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, "Category updated successfully");
            done();
          });
      });
      test("Update a category with wrong query string", function (done) {
        chai
          .request(server)
          .put("/categories/update/4?invalid=invalid")
          .end(function (err, res) {
            assert.equal(res.status, 500);
            assert.equal(res.body.message, "Error 500 - Internal error");
            done();
          });
      });
      test("Update a category with wrong id", function (done) {
        chai
          .request(server)
          .put("/categories/update/999?name=test")
          .end(function (err, res) {
            assert.equal(res.status, 404);
            assert.equal(res.body.message, "Error 404 - Category not found");
            done();
          });
      });
      test("Update a category with missing query string", function (done) {
        chai
          .request(server)
          .put("/categories/update/1")
          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body.message, "Error 400 - Bad request");
            done();
          });
      });
    });
    suite("Testing DELETE /categories/delete/:id", function () {
      test("Delete a category", function (done) {
        chai
          .request(server)
          .delete("/categories/delete/11")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, "Category deleted successfully");
            done();
          });
      });
      test("Delete a category with wrong id", function (done) {
        chai
          .request(server)
          .delete("/categories/delete/999")
          .end(function (err, res) {
            assert.equal(res.status, 404);
            assert.equal(res.body.message, "Error 404 - Category not found");
            done();
          });
      });
    });
  });
  suite("#Testing CRUD operations in /products API enpoint", function () {
    suite("Testing POST /products/create", function () {
      test("Create a new product with every filed", function (done) {
        chai
          .request(server)
          .post("/products/create")
          .send({
            name: "test creation 4",
            url_image: "www.test.com/image.jpg",
            price: 100,
            discount: 10,
            category: 1,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, "Product created successfully");
            done();
          });
      });
      test('Create a new product with missing "name" field', function (done) {
        chai
          .request(server)
          .post("/products/create")
          .send({
            name: "",
            url_image: "www.test.com/image.jpg",
            price: 100,
            discount: 10,
            category: 1,
          })
          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body.message, "Error 400 - Missing parameter");
            done();
          });
      });
      test('Create a new product with missing "category" field', function (done) {
        chai
          .request(server)
          .post("/products/create")
          .send({
            name: "test creation 3",
            url_image: "www.test.com/image.jpg",
            price: 100,
            discount: 10,
            category: "",
          })
          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body.message, "Error 400 - Missing parameter");
            done();
          });
      });
    });
    suite("Testing GET /products/", function () {
      test("Get all products", function (done) {
        chai
          .request(server)
          .get("/products")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body.products);
            done();
          });
      });
      test("Get all products with query string", function (done) {
        chai
          .request(server)
          .get("/products/?id&name&price&discount&category")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body.products);
            assert.property(res.body.products[0], "id");
            assert.property(res.body.products[0], "name");
            assert.property(res.body.products[0], "price");
            assert.property(res.body.products[0], "discount");
            assert.property(res.body.products[0], "category");
            done();
          });
      });
      test("Get product by id", function (done) {
        chai
          .request(server)
          .get("/products/1")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body.product, "id");
            assert.property(res.body.product, "name");
            assert.property(res.body.product, "price");
            assert.property(res.body.product, "discount");
            assert.property(res.body.product, "category");
            done();
          });
      });
      test("Get products with wrong query string", function (done) {
        chai
          .request(server)
          .get("/products/?id&name&invalid")
          .end(function (err, res) {
            assert.equal(res.status, 500);
            assert.equal(res.body.message, "Error 500 - Internal error");
            done();
          });
      });
    });
    suite("Testing PUT /products/update/:id", function () {
      test("Update a product with query string", function (done) {
        chai
          .request(server)
          .put("/products/update/2?name=test")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, "Product updated successfully");
            done();
          });
      });
      test("Update a product with wrong query string", function (done) {
        chai
          .request(server)
          .put("/products/update/2?name=test&invalid")
          .end(function (err, res) {
            assert.equal(res.status, 500);
            assert.equal(res.body.message, "Error 500 - Internal error");
            done();
          });
      });
      test("Update a product with wrong id", function (done) {
        chai
          .request(server)
          .put("/products/update/999?name=test")
          .end(function (err, res) {
            assert.equal(res.status, 404);
            assert.equal(res.body.message, "Error 404 - Product not found");
            done();
          });
      });
      test("Update a product with missing query string", function (done) {
        chai
          .request(server)
          .put("/products/update/2")
          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body.message, "Error 400 - Bad request");
            done();
          });
      });
    });
    suite("Testing DELETE /products/delete/:id", function () {
      test("Delete a product", function (done) {
        chai
          .request(server)
          .delete("/products/delete/4")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, "Product deleted successfully");
            done();
          });
      });
      test("Delete a product with wrong id", function (done) {
        chai
          .request(server)
          .delete("/products/delete/999")
          .end(function (err, res) {
            assert.equal(res.status, 404);
            assert.equal(res.body.message, "Error 404 - Product not found");
            done();
          });
      });
    });
  });
});
