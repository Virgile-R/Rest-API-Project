'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User)
    }
  };
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a title'
        },
        notEmpty: {
          msg: "Please provide a title"
        }
      }
      
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a description'
        },
        notEmpty: {
          msg: "Please provide a description"
        }
      }
      
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide an estimated completion time.'
        },
        notEmpty: {
          msg: "Please provide an estimated completion time."
        }
      }
      
    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide the materials needed for this course.'
        },
        notEmpty: {
          msg: "Please provide the materials needed for this course."
        }
      }
      
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};