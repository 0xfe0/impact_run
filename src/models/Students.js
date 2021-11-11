module.exports = (sequelize, Sequelize) => {
    const Students = sequelize.define("students", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      mark1: {
        type: Sequelize.INTEGER,
      },
      mark2: {
        type: Sequelize.INTEGER,
      },
      mark3: {
        type: Sequelize.INTEGER,
      }
    });
  
    return Students;
  };