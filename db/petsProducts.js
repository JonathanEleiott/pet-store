const client = require('./client.js');

const createPetProduct = async(petId, productId) => {
  try {
    const { rows: [ petProduct ] } = await client.query(`
      INSERT INTO pets_products (pets_id, products_id)
      VALUES (${petId}, ${productId})
      RETURNING *;
    `);
    return petProduct;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createPetProduct
}