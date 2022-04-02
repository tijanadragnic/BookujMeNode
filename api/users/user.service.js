const pool = require("../../config/database");


module.exports = {
    
    getUserByUserEmail: (email, callBack) => {
      pool.query(
        `SELECT * from users where email = ?`,
        [email],
        (error, results) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    },
   
 
    
   
      
    
  };