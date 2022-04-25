const { STRING, INTEGER} = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('category', {
    parent_id: {
        type: INTEGER
      },
    name: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    description: {
        type: STRING,
        allowNull: false,
      },
    image: {
        type: STRING
      },      
  });
};
