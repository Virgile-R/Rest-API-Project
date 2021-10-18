'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Course, {foreignKey: 'userId'})
    }
  };
  User.init({
    firstName:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a first name"
        },
        notEmpty: {
          msg: "Please provide a first name"
        }
      }},
    lastName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a last name"
        },
        notEmpty: {
          msg: "Please provide a last name"
        }
      }},
    emailAddress: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please provide an email address"
        },
        notEmpty: {
          msg: "Please provide an email adresse"
        },
        isEmail: {
          msg: "Your email address must be formated correctly (example@example.com)."
        }
      }},
      
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a password"
        },
      },
     
      set(val) {
        //emulates the len validation TODO: this erases all other errors, has to be fixed...
        if ( val.length >= 6 && val.length <= 20 ){
          const hashedPassword = bcrypt.hashSync(val, 10)
          this.setDataValue('password', hashedPassword)
      } else {
        const error = new Error('Your password must be between 6 and 20 characters long.')
        error.status = 400
        throw error
      }
      },
 
    }
  } , {
    sequelize,
    modelName: 'User',
  });
  return User;
};