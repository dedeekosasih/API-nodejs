const Register = require("../models/register.model");


exports.findAll = (req, res) => {
  Register.getAll((err, data) => {
    console.log(Date());
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving register.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const register = new Register({
    
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number
    
  });

  Register.create(register, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Register."
      });
    else res.send(data);
  });
};

  

exports.findOne = (req, res) => {
    Register.findById(req.params.registerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.registerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.registerId
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Register.updateById(
      req.params.registerId,
      new Customer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.registerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.registerId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Register.remove(req.params.registerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.registerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.registerId
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };

exports.register = function (req, res) {};
