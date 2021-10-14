module.exports = app => {
    const register = require("../controller/register.controller.js")
    


    app.get("/api/vaccine-user/register", register.create);
  
    app.post("/api/vaccine-user/register", register.findAll);

    app.post("/api/vaccine-user/User Unique ID/add-history", register.findOne); 

    app.delete("/api/vaccine-user/User Unique ID/del-history/HistoryUniqueID", register.delete);
    
    app.post("/api/vaccine/check-status", register.update); 

  

  };
  