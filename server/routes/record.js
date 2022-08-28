const express = require("express");

//recordRoutes is an instance of the Express router
//It is used to define our routes
const recordRoutes = express.Router();

//This connects us to the database
const dbo = require("../db/conn");

//This helps convert the id from string to ObjectId for _id
const ObjectId = require("mongodb").ObjectId;

//This will get a list of all the records
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//This will help get a single record by id
recordRoutes.route("record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//This will create a new record
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect.collection("records").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//This will allow updating a record by id
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set:  {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("One document updated");
        response.json(res);
    });
});

//This will allow deleting a record
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("One document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;
