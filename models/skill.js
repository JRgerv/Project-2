'use strict';
module.exports = function(sequelize, DataTypes) {
  var skill = sequelize.define('skill', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.skill.belongsToMany(models.user,{
          through: "user_skills"
        });
      }
    }
  });
  return skill;
};
