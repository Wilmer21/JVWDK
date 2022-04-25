require('dotenv').config();
const { Sequelize } = require('sequelize');
const crypto = require('crypto')
const fs = require('fs');
const path = require('path');
const { userInfo } = require('os');
const {
  DB_USER, DB_PASSWORD, DB_HOST ,DB_NAME
} = process.env;

//aqui se hace la conexion con la base de datos, se usa secualize un ORM que nos ayuda a gestionar muy rapido los procesos
const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: "127.0.0.1",
  dialect : 'mysql',
  operatorsAliases: false
});

const basename = path.basename(__filename);


const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category, New, Review, User } = sequelize.models;


//aqui se hacen las relaciones de las tablas que se van a usar

New.belongsToMany(Category, {through: 'news_categories'});
Category.belongsToMany(New, {through: 'news_categories'});

User.hasMany(Review);
Review.belongsTo(User);

New.hasMany(Review);
Review.belongsTo(New);

//password encryption//
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
  }
}
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.prototype.correctPassword = function(enteredPassword) {

  return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
