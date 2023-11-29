const client = require('./client.js');

const createProduct = async(name) => {
  try {
    const { rows: [ product ] } = await client.query(`
      INSERT INTO products (name)
      VALUES ('${name}')
      RETURNING *;
    `);
    return product;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createProduct
}