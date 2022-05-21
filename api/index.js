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
    //    email: "wilmer@gmail.com",
    //    password: "wilmer",
    //    first_name: "Wilmer",
    //    last_name: "Olarte",
    //    phone_number: "3115170002",
    //    user_role: "admin"
    // });
  });
})
