const connection = require('../database/connection');
module.exports = {
  async index(req, res){
    const { page = 1 } = req.query;

    const [ count ] = await connection('employees').count();

    console.log(count);

    const employees = await connection('employees')
    .limit(4)
    .offset((page -1 ) * 4)
    .select('*');

    res.header('X-Total-Count', count['count(*)'])

    return res.json(employees);
  }, 
  async create(req, res){
    const { name, surname, birthday, occupation, salary} = req.body;
    const companie_id = req.headers.authorization;

    const [id] = await connection('employees').insert({
      name,
      surname,
      birthday,
      occupation,
      salary,
      companie_id,
    });
    return res.json({id});
  },
  async delete(req, res){
    const { id } = req.params;
    const companie_id = req.headers.authorization;
     
    const employer = await connection('employees').where('id', id)
    .select('companie_id')
    .first();

    if(employer.companie_id !== companie_id ) {
      return res.status(401).json({error : "Operation not permitted."})
    }
    await connection('employees').where('id', id).delete();

    return res.status(204).send();
  }
};