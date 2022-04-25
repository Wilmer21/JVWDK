const { STRING, FLOAT, BOOLEAN, ARRAY } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('new', {
    description: {
      type: STRING(10000),
      allowNull: false
    },
    
    featured: {
      type: BOOLEAN,
      defaultValue: false
    },
    image: {
      type: STRING(1000),
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    
    rating: {
      type: FLOAT,
    },
    
  });
};
