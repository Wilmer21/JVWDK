/* aqui se une la conexion y el servidor para iniciar, ademas que estoy llamando al modelo user para crea un usuario*/
// const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { User } = require('./src/db.js');

// Syncing all the models at once.
const app = require('./src/app.js');

conn.sync({ force: false}).then(() => {
  app.listen(3000, () => { 
    console.log('%s listening at 3000'); 
    //  User.create({
    //    email: "dager@gmail.com",
    //    password: "dager",
    //    first_name: "Lean",
    //    last_name: "Nicolau",
    //    phone_number: "3517728831",
    //    user_role: "admin"
    // });
  });
})
