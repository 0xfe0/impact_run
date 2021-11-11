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
      },
      result: {
          type: Sequelize.STRING,
      },
    });

    Students.beforeSave((student, options) => {
        if(student.mark1 >= 33 && student.mark2 >= 33 && student.mark3 >= 33) {
            student.result = "Passed";
        } else {
            student.result = "Failed";
        }
     });
  
    return Students;
  };