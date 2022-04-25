const { TEXT, INTEGER} = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    rating: {
        type: INTEGER,
        allowNull: false
    },
    comment: {
        type: TEXT,
        allowNull: true
      },   
  });
};
