'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_skills = sequelize.define('user_skills', {
    userId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_skills;
};