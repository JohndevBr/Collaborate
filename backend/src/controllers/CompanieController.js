const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
  async index(req, res){
    const companies = await connection('companies').select('*');
    return res.json(companies);
  },
  async create(req, res) {
    const {name} = req.body;
    const id = crypto.randomBytes(4).toString('hex');

    await connection('companies').insert({id,name,});

    return res.json({ id }); 
  }
}