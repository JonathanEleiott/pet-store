const client = require('./client.js');
const { createOwner } = require('./owners.js');
const { createPet } = require('./pets.js');
const { createProduct } = require('./products.js');
const { createPetProduct } = require('./petsProducts.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS pets_products;
      DROP TABLE IF EXISTS pets;
      DROP TABLE IF EXISTS owners;
      DROP TABLE IF EXISTS products;
    `);
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        type VARCHAR(20) NOT NULL,
        owner_id int REFERENCES owners(id)
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets_products (
        pets_id int REFERENCES pets(id),
        products_id int REFERENCES products(id)
      )
    `);
  } catch(err) {
    console.log(err);
  }
}

const getPetsAndProducts = async() => {
  try {
    const { rows } = await client.query(`
      SELECT pets.name AS petsName, products.name AS productsName
      FROM pets
      JOIN pets_products ON pets.id = pets_products.pets_id
      JOIN products ON products.id = pets_products.products_id;
    `);
    console.log(rows);
  } catch(err) {
    console.log(err);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log(`CONNECTED TO THE DB!`);

  await dropTables();
  console.log(`TABLES DROPPED!`);

  await createTables();
  console.log(`CREATED TABLES!`);

  const nate = await createOwner('Nate');
  await createOwner('Sarah');
  const fred = await createOwner('Fred');
  console.log(`OWNERS CREATED!`);

  const cujo = await createPet('Cujo', 'doggo', nate.id);
  const rex = await createPet('Rex', 'horsey', nate.id);
  const bob = await createPet('Big Old Boy', 'hippo', fred.id);
  const mbigglesworth = await createPet('Mr. Bigglesworth', 'elephant');
  console.log(`PETS CREATED!`);

  const brush = await createProduct('brush');
  const ball = await createProduct('ball');
  const watermelon = await createProduct('watermelon');
  const toothbrush = await createProduct('toothbrush');
  const saddle = await createProduct('saddle');
  console.log(`PRODUCTS CREATED!`);

  await createPetProduct(cujo.id, ball.id);
  await createPetProduct(rex.id, brush.id);
  await createPetProduct(rex.id, saddle.id);
  await createPetProduct(bob.id, saddle.id);
  await createPetProduct(bob.id, ball.id);
  await createPetProduct(bob.id, watermelon.id);
  await createPetProduct(bob.id, toothbrush.id);
  await createPetProduct(mbigglesworth.id, toothbrush.id);
  await createPetProduct(mbigglesworth.id, saddle.id);
  await createPetProduct(mbigglesworth.id, ball.id);
  console.log(`PET PRODUCTS CREATED!`);

  await getPetsAndProducts()

  client.end();
}
syncAndSeed();