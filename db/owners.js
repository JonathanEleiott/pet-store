const client = require('./client.js');

const createOwner = async(name) => {
  try {
    const { rows: [ owner ] } = await client.query(`
      INSERT INTO owners (name) 
      VALUES ('${name}')
      RETURNING *;
    `);
    return owner;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createOwner
}