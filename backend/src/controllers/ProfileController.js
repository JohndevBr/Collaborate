const connection = require ('../database/connection');

module.exports = {
  async index(req, res){
    const companie_id = req.headers.authorization;
    
    const employees = await connection('employees')
    .where('companie_id', companie_id )
    .select('*');

    return res.json(employees);
  }
}