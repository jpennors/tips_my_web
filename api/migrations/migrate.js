const db = require('../config/db.config.js');

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});
