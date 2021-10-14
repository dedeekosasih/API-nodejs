const sql = require("./database");
const {v4 : uuidv4} = require('uuid');



const Register = function (register) {
  
  this.name = register.nama;
  this.password = register.password;
 
};

Register.getAll = (result) => {
  sql.query("SELECT * FROM register", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("register: ", res);
    result(null, res);
  });
};

Register.create = (dataRegister, result) => {
  sql.query("INSERT INTO register SET ?", dataRegister, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { ...dataRegister });
    result(null, { ...dataRegister });
  });
};

Register.findById = (registerId, result) => {

  
    console.log("registerId: ", registerId);
  sql.query(
    `SELECT * FROM register WHERE id = ${registerId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("User Id: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Register.remove = (id, result) => {
    sql.query("DELETE FROM register WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
     
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };

  Register.updateById = (id, register, result) => {
    sql.query(
      "UPDATE register SET identity_card_number = ?, name = ?, password = ? WHERE id = ?",
      [register.identity_card_number, register.name, register.password, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
         
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id, ...register });
        result(null, { id: id, ...register });
      }
    );
  };

module.exports = Register;
