const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'pg',
    password : 'qwe',
    database : 'db'
  }
});

const data = [];
function generate() {
  for (let i = 0; i < 10000; i++) {
    data.push({user_id: 1, value: i, endDate: new Date()});
  }
}

generate();

async function run() {
  await knex.schema.dropTableIfExists('test-table');
  await knex.schema.createTable('test-table', function (table) {
    // table.uuid('id');
    table.bigInteger('user_id');
    table.float('value');
    table.timestamp('endDate');

    // table.unique('id');
  });

  console.log('start');
  for(let i = 0; i < 1000; i++) {
    let a = Date.now();
    await knex('test-table').insert(data);
    console.log(Date.now() - a, 'ms');
  }
}

run();

